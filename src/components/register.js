import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props){
    super(props);

    this.onChangeForm = this.onChangeForm.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);

    this.state = {
      username: "",
      password: "turtle"
    }
  }
  
  componentDidMount(){
    axios.get('http://localhost:5000/users')
      .then(res => {

      })
  }

  onChangeForm(event) {
    this.setState({
      username: event.target.value
    })
  }

  onClick(event) {
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(user);

    axios.post('http://localhost:5000/users/register', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  onClickLogin(event){
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(`logging in ${user}`);
    axios.post('http://localhost:5000/users/register', user)
      .then(res => console.log(res.data));
  }

  render(){
    return (
      <div>
        <div>Create a new user</div>
        <input type="text" value={this.state.username} onChange={this.onChangeForm}></input>
        <button onClick={this.onClick}>Submit</button>
      </div>
    )
  }
}

export default Register;