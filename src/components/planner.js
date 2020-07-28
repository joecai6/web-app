import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "../css/planner.css";

class CourseUnitItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {value: "", placeholder: "Enter a course"};
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
  }

  render(){
    return (
      <div className="course-unit">
        <div>{this.props.title}</div>
        <CourseUnitItem editing={this.props.editing}/>
        <CourseUnitItem editing={this.props.editing}/>
        <CourseUnitItem editing={this.props.editing}/>
        <CourseUnitItem editing={this.props.editing}/>
        <CourseUnitItem editing={this.props.editing}/>
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
    return (
      <div className="course-year-wrapper">
        <h2>{this.props.title  + " " + this.props.year}</h2>
        <div className="course-unit-wrapper">
            <CourseUnitList editing={this.state.editing} title="Fall"/>
            <CourseUnitList editing={this.state.editing} title="Winter"/>
            <CourseUnitList editing={this.state.editing} title="Summer"/>
        </div>
        <button className="btn-primary" onClick={this.handleEditClick}>Edit</button>

      </div>
    );
  }
}

class Planner extends React.Component {

  render(){
    var list = [
      {course: "CSE 10"},
      {course: "CSE 101"},
      {course: "CSE 105"},
      {course: "CSE 140"}
    ];  
    return (
      <div className="window">
        <div className="jumbotron">
          PLanner
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
        <CourseYearList title="Freshman Year" year={2020}/>
        <CourseYearList title="Sophmore Year" year={2020}/>
        <CourseYearList title="Junior Year" year={2020}/>
      </div>
    );
  }
}

export default Planner;