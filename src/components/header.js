import React from 'react';
import {NavLink} from 'react-router-dom';

function Header(props){
  return(
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/planner">Planner</NavLink>
    </nav>
  );
}

export default Header;