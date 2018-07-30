import React, { Component } from "react";
import { Link } from 'react-router-dom' 
import img from "./src/img/logo.png";

import "./src/css/Navbar.css";

import List from "./List";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
      hamburger: true
    };
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
      hamburger: !this.state.hamburger
    });
  }

  render() {
    return (
      <div className="contain">
        <div className={this.state.hamburger? "navbar":"navbar overlay navbarToggle"}>
          <div className="t-logo">
            <img src={img} alt="" />
          </div>
          <div className="t-ctos">
            <div className="toggle">
              <div className={this.state.hamburger ? "navtoggle fa fa-bars navtoggle-both" : "fa fa-bars navtoggle navtoggle-mobile"} onClick={this.toggleHidden.bind(this)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className={this.state.isHidden ? "list_" : "list_ active"}>
              {!this.state.isHidden && <List />}
            </div>
            <div className="int-ctos">
              <ul id="tushar">
                <li>
                  <Link to="">CA PORTAL</Link>
                </li>
                <li>
                  <Link to="">ZONALS</Link>
                </li>
                <li className="dropdown">
                  <Link to="">EVENTS</Link>
                  <div className="dropdown-content">
                    <Link to="#">ONLINE EVENTS</Link>
                    <Link to="#">OFFLINE EVENTS</Link>
                  </div>
                </li>
                <li>
                  <Link to="">TEAM CONTACT</Link>
                </li>
                <li>
                  <Link to="">OUR SPONSERS</Link>
                </li>
                <li>
                  <Link to="">FAQs</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
