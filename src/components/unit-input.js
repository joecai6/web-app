import React from 'react';
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
export default CourseUnitInput;