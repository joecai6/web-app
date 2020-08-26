import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "../css/planner.css";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Header from './header';

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
      <div className="m-3 bg-info">
        <div className="course-unit-text pt-2 pl-2 h5">{this.props.title}</div>      
        <div className="course-unit w-100">
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
      year: this.props.title,
      classDropdown: "fade-out"
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.updateYearState = this.updateYearState.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
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

  onHeaderClick() {
    
    let toggle = this.state.classDropdown === "fade-out" ? "fade-in" : "fade-out";
    this.setState({classDropdown: toggle}, () => console.log(this.state.classDropdown));
  }

  render(){
    return (
      <div className="course-year-wrapper container overflow-hidden">
        <span className="row button bg-danger" onClick={this.onHeaderClick}>
          <h2 className="year-title w-100">{this.props.title  + " " + this.props.year}</h2>
        </span>
        <div className="overflow-hidden">
          <div className={`${this.state.classDropdown}`}>
            <div className={`row bg-white`}>
              <div className="col border-1 m-3">
                  <CourseUnitList editing={this.state.editing} title="fall" 
                    updateYear={this.updateYearState} courseList={this.state.list[0] || {}}/>
              </div>
              <div className="col border-1 m-3">
                  <CourseUnitList editing={this.state.editing} title="winter" courseList={this.state.list[1] || {}}
                    updateYear={this.updateYearState}/>
              </div>
              <div className="col border-1 m-3">
                  <CourseUnitList editing={this.state.editing} title="spring"courseList={this.state.list[2] || {}}
                    updateYear={this.updateYearState}/>
              </div>
            </div>
          </div>
        </div>
        <button className="btn-primary my-2" onClick={this.handleEditClick}>Edit</button>

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
      forthYear:[
        {title:"fall", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]},
        {title:"winter", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]},
        {title:"spring", courses: [{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""},{name:"",units:0,desc:""}]}
      ],
      isLoading: true,
      classDropdown:"fade-out"
    }
    this.onChangeMsg = this.onChangeMsg.bind(this);
    this.postMsg = this.postMsg.bind(this);
    this.onClickDropdown = this.onClickDropdown.bind(this);
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
        else if(yearTerm.year == "senior"){
          this.setState({forthYear: yearTerm.terms});
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

  onClickDropdown() {
    let toggle = this.state.classDropdown === "fade-out" ? "fade-in" : "fade-out";
    this.setState({classDropdown: toggle});
  }

  render(){  
    if(this.state.isLoading){
      return <div><h1>LOADING</h1></div>
    }
    return (
      <div className="container-fluid window">
        <div className="container">
          <Header />
          <div className="jumbotron title-bar shadow-lg">
            <h1 className="display-5">Academic Plan</h1>
            <div className="lead mt-4">Plan the courses for a complete map of the path you are going to take in your desired college experience.</div>
          </div>
          <div className="container">
            <button className="btn btn-secondary" onClick={this.onClickDropdown}>Dropdown</button>
            <div className="overflow-hidden">
              <div className={`${this.state.classDropdown}`}><div>HELLO</div></div>
            </div>
          </div>

          <div className="container">
          <CourseYearList title="freshman" year={2020} termList={this.state.firstYear}/>
            <CourseYearList title="sophmore" year={2020} termList={this.state.secondYear}/>
            <CourseYearList title="junior" year={2020} termList={this.state.thirdYear}/>
            <CourseYearList title="senior" year={2020} termList={this.state.forthYear}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Planner;