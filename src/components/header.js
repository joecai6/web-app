import React from 'react';
import {NavLink} from 'react-router-dom';

function Header(){
  return(
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/planner">Planner</NavLink>
      <NavLink exact to="/register">Register</NavLink>
      <NavLink exact to="/login">Login</NavLink>
    </nav>
  );
}

export default Header;