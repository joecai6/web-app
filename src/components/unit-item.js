import React from 'react';
import CourseUnitInput from './unit-input'

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
      else if(!this.props.editing)
        course = <span className="row w-100 course-span form-control pl-2">&nbsp;
          <div className="">{this.state.value}</div>
        </span>;
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

export default CourseUnitItem;