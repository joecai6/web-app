import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "../css/planner.css";

class CourseUnitItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {value: this.props.course, placeholder: "Enter a course"};
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event){
    this.setState({value:event.target.value}, () => {
      console.log(this.state.value);
    })
  }

  render(){
      let course = this.props.editing? 
        <CourseUnitInput title="" value={this.state.value} placeholder={this.state.placeholder}
          handleTextChange={this.handleTextChange}/>
        :<span className="course-span form-control">&nbsp;{this.state.value}</span>;

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
        <h3>{this.props.title}</h3>
        <input className="course-input form-control" value={this.props.value} onChange={this.props.handleTextChange} placeholder={this.props.placeholder}/>
      </div>
    );
  }
}

class CourseUnitList extends React.Component {
  constructor(props){
    super(props);

    // set state to be the courses list
  }

  render(){
    let current = [];
    let remaining = [];
    let remainingSize = this.props.courseList.courses ? 5 - this.props.courseList.courses.length : 5;
    for(let i = 0; i < remainingSize; i++){
      remaining.push(
        <CourseUnitItem editing={this.props.editing} course=""/>
      )
    }
    if(this.props.courseList.courses){
      current = this.props.courseList.courses.map((item, index) => (
        <CourseUnitItem editing={this.props.editing} course={item}/>
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

    this.state = {editing: false};
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  
  handleEditClick(){
    this.setState((prevState) => (
      {editing: !prevState.editing}
    ));
  }

  render(){
    let list = this.props.termList || {};
    return (
      <div className="course-year-wrapper">
        <h2>{this.props.title  + " " + this.props.year}</h2>
        <div className="course-unit-wrapper">
            <CourseUnitList editing={this.state.editing} title="Fall" courseList={list.fall || {}}/>
            <CourseUnitList editing={this.state.editing} title="Winter" courseList={list.winter || {}}/>
            <CourseUnitList editing={this.state.editing} title="Summer"courseList={list.spring || {}} />
        </div>
        <button className="btn-primary" onClick={this.handleEditClick}>Edit</button>

      </div>
    );
  }
}

class Planner extends React.Component {

  render(){  
    let termList = {
      first: {
        fall: {courses:["CSE 100"]}, 
        winter: {courses:["asdasda", "asdasda", "sdadsa"]},
        spring: {courses:["CSE 100"]}
      }
    };
    return (
      <div className="window">
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

        <CourseYearList title="Freshman Year" year={2020} termList={termList.first}/>
        <CourseYearList title="Sophmore Year" year={2020} termList={termList.second || {}}/>
        <CourseYearList title="Junior Year" year={2020} termList={termList.third || {}}/>
      </div>
    );
  }
}

export default Planner;