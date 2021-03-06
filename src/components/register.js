import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props){
    super(props);

    this.onChangeForm = this.onChangeForm.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: ""
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

  onChangeForm(event, str) {
    if(str === 'username'){
      this.setState({
        username: event.target.value
      })
    } 
    else if(str === 'password'){
      this.setState({
        password: event.target.value
      })
    }
    else if(str === 'first'){
      this.setState({
        firstname: event.target.value
      })
    }
    else if(str === 'last'){
      this.setState({
        lastname: event.target.value
      })
    }
  }

  register = (user) => {
    axios.post("http://localhost:5000/users/register", user,
      {withCredentials: true})
      .then((res) => {
        if(res.data.redirect == '/login'){
          this.props.history.push('/login');
        }
      })
      .catch(error => {
        console.log(error);
    });;
  };

  onClick(event) {
    const user = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }

    console.log(user);

    this.register(user);
    
    this.setState({
      username: '',
      password: '',
      firstname: '',
      lastname: ''
    })

    window.location.reload(false);
  }

  render(){
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="h2 mb-4">Create a new user</div>
        <div>
          <div>Username</div>
          <input className="form-control my-1" type="text" value={this.state.username} onChange={(e) => this.onChangeForm(e, 'username')}></input>
          <div>Password</div>
          <input className="form-control my-1" type="text" value={this.state.password} onChange={(e) => this.onChangeForm(e, 'password')}></input>
          <div>First Name</div>
          <input className="form-control my-1" type="text" value={this.state.firstname} onChange={(e) => this.onChangeForm(e, 'first')}></input>
          <div>Last Name</div>
          <input className="form-control my-1" type="text" value={this.state.lastname} onChange={(e) => this.onChangeForm(e, 'last')}></input>
        </div>
        <button className="btn btn-primary btn-dark m-3" onClick={this.onClick}>Register</button>
      </div>
    )
  }
}

export default Register;