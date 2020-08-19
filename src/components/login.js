import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props){
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);

    this.state = {
      username: "fake",
      password: "user",
      loggedIn: false
    }

    this.checkLoggedIn();
  }

  onChangeUser(event) {
    this.setState({
      username: event.target.value
    })
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  checkLoggedIn = () => {
    axios.get("http://localhost:5000/users/login", {withCredentials:true})
      .then((res) => {
        if(res.data.redirect == '/'){
          this.setState({loggedIn: true});
          this.props.history.push('/');
        }
        console.log(res.data)
      });
  };

  login = (user) => {
    axios.post("http://localhost:5000/users/login", user, {withCredentials:true})
      .then((res) => {
        if(res.data.redirect === '/'){
          this.props.history.push('/');
        }
        else if(res.data.redirect === '/login'){
          this.setState({loggedIn: true});
        }
        console.log(res.data)
      });
  };

  onClickLogin(event){
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log('logging in ' + user.username);
    this.login(user);
  }

  render(){
    let Already= () => {
      if(this.state.loggedIn)
        return <div>Already Logged in</div>
      else 
        return <div></div>
    }
    return (
      <div>
        <div className="h3">Login</div>
        <div>
          <div>Username</div>
          <input type="text" value={this.state.username} onChange={this.onChangeUser}></input>
          <div>Password</div>
          <input type="text" value={this.state.password} onChange={this.onChangePassword}></input>
        </div>
        <button onClick={this.onClickLogin}>Login</button>
        <a href="/register">Register</a>
        <Already />
      </div>
    )
  }
}

export default withRouter(Login);