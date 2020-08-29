import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router";
import logo from '../css/imgs/logoplacer.jpeg';

function Header(props){
  const history = useHistory();
  const handleLogOut = () => {  
    axios.get("http://localhost:5000/users/logout", {withCredentials: true}).then((res) => {
      if(res.data.redirect === '/login'){
        history.push('/login');
      }
      console.log(res.data);
    });
  }

  return(
    <>
    <Navbar className="nav-bg">
      <Navbar.Brand>
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        CourseMap
      </Navbar.Brand>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/planner">Planner</Nav.Link>
      <Nav.Link className="ml-auto" onClick={handleLogOut}>Logout</Nav.Link>
    </Navbar>
    </>
  );
}

export default Header;