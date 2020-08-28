import React from 'react';
import {NavLink} from 'react-router-dom';

function Header(props){
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item ml-2">
          <NavLink exact to="/">Home</NavLink>
        </li>
        <li className="nav-item ml-2">
          <NavLink exact to="/planner">Planner</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;