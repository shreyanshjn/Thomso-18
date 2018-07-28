import React, { Component } from "react";

import img from "./images/logo.png";

import "../../../node_modules/font-awesome/css/font-awesome.css";

import "./css/nav.css";

import List from "./list";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true
    };
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    return (
      <div className="contain">
        <div className="navbar">
          <div className="t-logo">
            <img src={img} alt="" />
          </div>
          <div className="t-ctos">
            <div className="toggle">
              <i
                onClick={this.toggleHidden.bind(this)}
                className="fa fa-bars"
              />
            </div>
            <div className={this.state.isHidden ? "list_" : "list_ active"}>
              {!this.state.isHidden && <List />}
            </div>
            <div className="int-ctos">
              <ul id="tushar">
                <li>
                  <a href="">CA PORTAL</a>
                </li>
                <li>
                  <a href="">ZONALS</a>
                </li>
                <li className="dropdown">
                  <a href="">EVENTS</a>
                  <div className="dropdown-content">
                    <a href="#">ONLINE EVENTS</a>
                    <a href="#">OFFLINE EVENTS</a>
                  </div>
                </li>
                <li>
                  <a href="">TEAM CONTACT</a>
                </li>
                <li>
                  <a href="">OUR SPONSERS</a>
                </li>
                <li>
                  <a href="">FAQs</a>
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
