import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props){
    super(props);

    this.onChangeForm = this.onChangeForm.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      username: "",
      password: ""
    }
  }
  
  componentDidMount(){
    axios.get("http://localhost:5000/users/login", {withCredentials:true})
      .then((res) => {
        if(res.data.redirect == '/'){
          this.props.history.push('/');
        }
      });
  }

  onChangeForm(event, username) {
    if(username){
      this.setState({
        username: event.target.value
      })
    } else {
      this.setState({
        password: event.target.value
      })
    }
  }

  register = (user) => {
    axios.post("http://localhost:5000/users/register", user,
      {withCredentials: true}).then((res) => console.log(res));
  };

  onClick(event) {
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(user);

    this.register(user);
    
    this.setState({
      username: '',
      password: ''
    })
  }

  render(){
    return (
      <div>
        <div className="h3">Create a new user</div>
        <div>
          <div>Username</div>
          <input type="text" value={this.state.username} onChange={(e) => this.onChangeForm(e, true)}></input>
          <div>Password</div>
          <input type="text" value={this.state.password} onChange={(e) => this.onChangeForm(e, false)}></input>
        </div>
        <button onClick={this.onClick}>Register</button>
        <a href='/login'>Back to login</a>
      </div>
    )
  }
}

export default Register;