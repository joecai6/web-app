import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props){
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);

    this.state = {
      username: "test",
      password: ""
    }
  }

  onChangeUser(event) {
    this.setState({
      username: event.target.value
    })
  }

  onClickLogin(event){
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log('logging in ' + user.username);
    axios.post('http://localhost:5000/users/login', user)
      .then(res => console.log(res.data));
  }

  render(){
    return (
      <div>
        <div>Login</div>
        <input type="text" value={this.state.username} onChange={this.onChangeUser}></input>
        <button onClick={this.onClickLogin}>Login</button>
      </div>
    )
  }
}

export default Login;