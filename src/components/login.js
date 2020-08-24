import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import '../css/login.css';
import logo from '../css/imgs/logoplacer.jpeg';
import Register from './register';

class Login extends React.Component {
  constructor(props){
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickLoginReg = this.onClickLoginReg.bind(this);
    this.onClickRegister = this.onClickRegister.bind(this);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      registerClicked: false,
      loginClicked: false
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

  onClickLoginReg(){
    this.setState({loginClicked: !this.state.loginClicked}, ()=>{
      console.log(this.state.loginClicked);
    });
    this.setState({registerClicked: false})
  }

  onClickRegister() {
    this.setState({loginClicked: false});
    this.setState({registerClicked: !this.state.registerClicked})
  }

  render(){
    let Already= () => {
      if(this.state.loggedIn)
        return <div>Already Logged in</div>
      else 
        return <div></div>
    }
    return (
      <div className="container login-background d-flex justify-content-center align-items-center">
        <div className="bg-white login-wrapper shadow-lg">
          <div className="login-left">
           <img className="visible" src={logo} alt="LOGO" width="200" height="200" />
           <h1>CourseMap</h1>
            <div className="login-left-text">
              <p>A productive tool to plan your journey through college. Create a plan, Track your progress, and Develop your goal.</p>
            </div>
          </div>
          <div className="login-right row no-gutters">
            <div className={`col d-flex flex-column justify-content-center align-items-center 
                            ${this.state.registerClicked ? "login-slide-out" : ""} ${this.state.loginClicked ? "login-slide-in" : ""}`}>
              <div className="h2 mb-4">Sign In</div>
              <div className="">
                <div className="">Username</div>
                <input className="login-input form-control my-2" type="text" value={this.state.username} onChange={this.onChangeUser}></input>
                <div>Password</div>
                <input className="login-input form-control my-2" type="text" value={this.state.password} onChange={this.onChangePassword}></input>
              </div>
                <button id="login-button" className="btn btn-primary btn-dark m-3" onClick={this.onClickLogin}>Login</button>
                <button onClick={this.onClickRegister}>Register</button>
            </div>
          </div>
        </div>
          <div className={`d-flex flex-column justify-content-center align-items-center 
                          register right hide ${this.state.registerClicked ? "register-slide-in" : ""}
                          ${this.state.loginClicked ? "register-slide-out" : ""}`}>
              <Register />
              <button onClick={this.onClickLoginReg}>Login</button>
          </div>
      </div>
    )
  }
}

export default withRouter(Login);