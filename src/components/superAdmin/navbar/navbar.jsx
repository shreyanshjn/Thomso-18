import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css';

export default class Navbar extends React.Component{
render(){
    return(
      <div className="ca-admin-nav">
        <ul>
          <li>
            <Link to="/super/">
              Home
            </Link>
          </li>
          <li><Link to="/super/logout">Logout</Link></li>
        </ul>
      </div>
    )
  }
}