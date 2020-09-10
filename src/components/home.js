import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Header from './header';
import '../css/home.css';
import ProfileModal from './profile';

class Home extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      data: {},
      show: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount(){
    this.getUser();
  }

  handleClose = (newData) => {
    this.setState({show: false});
    let newState = this.state.data;
    for(const prop in newData){
      if(this.state.data[prop] !== newData[prop]){
        newState[prop] = newData[prop];
      }
    }
    this.setState({date: newState});
  }
  
  handleShow = () => this.setState({show: true});

  getUser = () => {
    axios.get("http://localhost:5000/users/", {withCredentials: true}).then((res) => {
      this.setState({data: res.data});
      if(res.data.redirect === '/login'){
        this.props.history.push('/login');
      }
    });
  };
  
  render(){
    let data = this.state.data;
    return (
      <div className="container-fluid p-0 overflow-hidden">
        <Header />
        <div className="home-banner d-flex align-items-center p-5 justify-content-between mb-4">
          <div className="h3">Welcome to CourseMap!
            <div className="pt-3 h6">Map out and track through your plan.</div>
          </div>
        </div>
        <div className="row">
            <div className="home-panel col-7 ml-auto mb-5 shadow-lg">
              <div className="d-flex m-3">
                <div id="welcome-text">{data ? <h4>Hi, {data.firstname}!</h4> : <h4>No user found.</h4>}</div>
                <div className="h4 mx-5">Here is your profile.</div>
                <button id="update-button" className="btn btn-secondary my-0 ml-auto" onClick={this.handleShow}>
                  Update
                </button>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col mb-2">
                    <div id="school-text">{data ? <div><b>School:</b> {data.school}</div> : <div>not inputed</div>}</div>
                  </div>
                  <div id="major-text" className="col">
                    {data ? <div><b>Major:</b> {data.major}</div> : <div>not inputed</div>}
                  </div>
                  <div className="col-12 mb-2">
                    <div id="current-year-text">{data ? <div><b>Current Year:</b> {new Date().toLocaleString()}</div> : <div>not inputed</div>}</div>
                  </div>
                  <div className="col-6 mb-2">
                    <div id="start-text">{data ? <div><b>Start date:</b> {data.start}</div> : <div>not inputed</div>}</div>
                  </div>
                  <div className="col-6 mb-2">
                    <div id="end-text">{data ? <div><b>Graduating In:</b> {data.end}</div> : <div>not inputed</div>}</div>
                  </div>
                  <div className="col-12">[PROGRESS BAR UNTIL GRADUATION]</div>
                </div>
              </div>
            </div>
            <div className="home-panel col-4 mx-auto shadow-lg">
              <div className="h4 m-3">Planner</div>
              <div className="">
                <div className="mb-2"><b>Last Updated:</b> {new Date().toLocaleString()}</div>
                <div className="mb-2"><b>Total Units:</b></div>
                <div className="mb-2"><b>GPA:</b></div>
                <div className="mb-2"><b>Units until graduation:</b></div>
              </div>
            </div>
        </div>
        <ProfileModal id="profile" show={this.state.show} handleClose={this.handleClose} user={data}/>
        <div className="home-info-window mb-5 bg-warning row p-0">
          <div className="col-6 bg-info info-background">
            <div className=""></div>
          </div>
          <div className="col-6 info-text-bg">
            <div className="m-5">
              <div className="mb-4 h4">What is CourseMap?</div>
              <div>
                CourseMap is a long term planner for college students to keep track of throughout their academic experience.
                Many students do not follow a four year academic plan, so CourseMap provides a platform for students to engage
                with their academic courses while being well aware of the path they forsake.<br></br><br></br>
                The goal of this app is to assist users in assuring that they will graduate on time and be prepared with
                the courses they will take next term. Coursemap is a convienent application that allow users to easily create
                a four year plan, instead of creating it by themselves through excel or downloading a template. There are many helpful features
                users can incorpate in forming their plan, such as downloading their plan into a printable pdf, autofilling their courses, etc.
                CourseMap also provides a progress bar to track the amount of units needed for graduation and the overall GPA.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);