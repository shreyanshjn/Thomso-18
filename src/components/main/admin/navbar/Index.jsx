import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

export default class Navbar extends React.Component{
render(){
    return(
      <div className="zonals-admin-nav">
        <ul>
          <li><Link to="/main/admin/">PAGE 1</Link></li>
          <li><Link to="/main/admin/page2">PAGE 2</Link></li>
          <li><Link to="/main/admin/page3">PAGE 3</Link></li>
          <li><Link to="/main/admin/page4">PAGE 4</Link></li>
          <li><Link to="/main/admin/page5">PAGE 5</Link></li>
          <li><Link to="/main/admin/page6">PAGE 6</Link></li>

          <li><Link to="/main/admin/associateWithUs">Asso. Us</Link></li>
          <li><Link to="/main/admin/eventUser">Event</Link></li>
          <li><Link to="/main/admin/logout">Logout</Link></li>
        </ul>
      </div>
    )
  }
}