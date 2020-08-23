import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "../css/planner.css";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Header from './header';

class CourseUnitItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {value: this.props.course, placeholder: "Enter a course"};
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event){
    this.props.handler(event, this.props.index);
    this.setState({value:event.target.value});
  }

  render(){
      let course;
      if(this.props.editing)
        course = <CourseUnitInput title={this.props.title} value={this.state.value} placeholder={this.state.placeholder}
          handleTextChange={this.handleTextChange} />
      else if(this.state.value !== "")
        course = <span className="course-span form-control">&nbsp;{this.state.value}</span>;
      else {
        course = <div></div>
      }
      return (
        <div className="div-wrap">
          {course}
        </div>
      );
  }
}

class CourseUnitInput extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="div-wrap">
        <input className="course-input form-control" value={this.props.value} onChange={this.props.handleTextChange} placeholder={this.props.placeholder}/>
      </div>
    );
  }
}

class CourseUnitList extends React.Component {
  constructor(props){
    super(props);

    // set state to be the courses list
    this.state = {
      courses: this.props.courseList.courses, //object
      value: "",
      index: 0,
      courseItems: []
    }

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event, index){
    this.props.updateYear(event, this.props.title, index);
    this.setState({value:event.target.value})
  }

  render(){
    let current = [];
    if(this.state.courses){
      current = this.state.courses.map((item, index) => (
        <CourseUnitItem index={index} editing={this.props.editing} title={this.props.title} 
              handler={this.handleTextChange} course={item.name}/> 
      ))
    }
    return (
      <div>
        <div className="course-unit-text">{this.props.title}</div>      
        <div className="course-unit">
          {current}
        </div>
      </div>
    ); 
  }
}

class CourseYearList extends React.Component {
  constructor(props){
    super(props);
    axios.defaults.baseURL = 'http://localhost:5000/';
    axios.defaults.withCredentials = true;
    this.state = {
      editing: false,
      list: this.props.termList || [],
      year: this.props.title
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.updateYearState = this.updateYearState.bind(this);
  }
  
  postTerm = () => {
    const data = {
      term: this.state.list,
      termName: this.state.year
    }
    axios.post('/plan/addTerm', data).then((res)=>{
      console.log(res.data);
    }
    )
  }

  handleEditClick(){
    this.setState((prevState) => (
      {editing: !prevState.editing}
    ),()=>{
      if(!this.state.editing){
        this.postTerm();
      }
    })
  }
  
  updateYearState(event, title, index) {
    if(this.state.editing){
      let term = this.state.list.find((obj) => obj.title == title);
      if(term){
        if(term.courses[index]){
          term.courses[index].name = event.target.value;
        }
      }
    }
  }

  render(){
    return (
      <div className="course-year-wrapper">
        <h2>{this.props.title  + " " + this.props.year}</h2>
        <div className="course-unit-wrapper">
            <CourseUnitList editing={this.state.editing} title="fall" 
              updateYear={this.updateYearState} courseList={this.state.list[0] || {}}/>
            <CourseUnitList editing={this.state.editing} title="winter" courseList={this.state.list[1] || {}}
              updateYear={this.updateYearState}/>
            <CourseUnitList editing={this.state.editing} title="spring"courseList={this.state.list[2] || {}}
              updateYear={this.updateYearState}/>
        </div>
        <button className="btn-primary" onClick={this.handleEditClick}>Edit</button>

      </div>
    );
  }
}

class Planner extends React.Component {
  constructor(props){
    super(props);
    axios.defaults.baseURL = 'http://localhost:5000/';
    axios.defaults.withCredentials = true;
    this.state = {
      msg: "",
      firstYear: [
        {title:"fall", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]},
        {title:"winter", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]},
        {title:"spring", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]}
      ],
      secondYear: [
        {title:"fall", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]},
        {title:"winter", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]},
        {title:"spring", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]}
      ],
      thirdYear:[
        {title:"fall", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]},
        {title:"winter", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]},
        {title:"spring", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]}
      ],
      isLoading: true
    }
    this.onChangeMsg = this.onChangeMsg.bind(this);
    this.postMsg = this.postMsg.bind(this);
    this.getUser();
    this.getPlan();
    this.getTerms();
  }

  getTerms = () => {
    axios.get('/plan/allTerms').then((res)=>{
      res.data.forEach((yearTerm) => {
        if(yearTerm.year == "freshman"){
          this.setState({firstYear: yearTerm.terms});
        }
        else if(yearTerm.year == "sophmore"){
          this.setState({secondYear: yearTerm.terms});
        }
        else if(yearTerm.year == "junior"){
          this.setState({thirdYear: yearTerm.terms});
        }
      })
      this.setState({isLoading: false});
    })
  }

  getPlan = () => {
  }

  getUser = () => {
    axios.get('/users/').then((res) => {
      if(res.data.redirect === '/login'){
        this.props.history.push('/login');
      }
    });
  }
  
  postMsg = () => {

  }

  onChangeMsg(event){
    this.setState({
      msg: event.target.value
    })
  }

  render(){  
    if(this.state.isLoading){
      return <div><h1>LOADING</h1></div>
    }
    return (
      <div className="window">
        <Header />
        <div className="jumbotron">
          <h1>Four Year Plan</h1>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Test Dropdown
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <CourseYearList />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <CourseYearList title="freshman" year={2020} termList={this.state.firstYear}/>
        <CourseYearList title="sophmore" year={2020} termList={this.state.secondYear}/>
        <CourseYearList title="junior" year={2020} termList={this.state.thirdYear}/>
        <textarea value={this.state.msg} onChange={this.onChangeMsg}></textarea>
        <button onClick={this.postMsg}>Save</button>
      </div>
    );
  }
}

export default Planner;