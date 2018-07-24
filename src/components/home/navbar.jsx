import React, { Component } from "react";

import img from "./images/logo.png";
import "./css/nav.css";

import back from "./images/back.jpg";

class Navbar extends Component {
  styles = {
    // backgroundImage: "url(" + { back } + ")",
    backgroundColor: "#000",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    height: "100vh",
    width: "100%"
  };

  render() {
    return (
      <div className="contain" style={this.styles}>
        <div className="navbar">
          <div className="t-logo">
            <img src={img} alt="" />
          </div>
          <div className="t-ctos">
            <div>
              <a href="">CA PORTAL</a>
            </div>
            <div>
              <a href="">ZONALS</a>
            </div>
            <div>
              <a href="">TEAM CONTACT</a>
            </div>
            <div>
              <a href="">OUR SPONSERS</a>
            </div>
            <div>
              <a href="">FAQs</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
