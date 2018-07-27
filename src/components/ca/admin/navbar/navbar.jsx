import React from 'react';
import './navbar.css';

export default class Navbar extends React.Component{
render(){
    return(
        <div className="nav">
      <ul>
        <li className="home"><a className="active" href="#">Home</a></li>
        <li className="tutorials"><a  href="#">Ideas</a></li>
        <li className="about"><a href="#">About</a></li>
        <li className="news"><a href="#">Newsletter</a></li>
        <li className="contact"><a href="#">Logout</a></li>
      </ul>
    </div>
    )
}
}