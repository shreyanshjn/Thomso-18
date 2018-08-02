import React, { Component } from "react";
import { Link } from 'react-router-dom' ;
import img from "./src/img/logo.png";

import "./src/css/Navbar.css";

import List from "./List";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
        hamburger: true,
        activeState:window.location.pathname.substring(1)
    };
    this.setActive=this.setActive.bind(this);
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
      hamburger: !this.state.hamburger
    });
  }
  setActive(state)
    {
       this.setState({
       activeState:state
       });
    }
    render() {
    return (
      <div className="contain">
        <div className={this.state.hamburger? "navbar":"navbar overlay navbarToggle"}>
          <div className="t-logo">
              <Link to="./"> <img src={img} alt="" /></Link>
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
                    <Link to="../ca/" className={(this.state.activeState === "ca/") ? "linkCaportal" : null}
                    onClick={() => {
                                    this.setActive("linkCaportal");
                    }}>
                    CA PORTAL
                    </Link>
                </li>
                {/*     <li>
              <Link to="" className={(this.state.activeState === "linkZonals") ? "linkZonals" : null}
                    onClick={() => {
                                    this.setActive("linkZonals");
                    }}>
                    ZONALS
                </Link>
                </li>
                <li className="dropdown">
                    <Link to="" className={(this.state.activeState === "linkEvents") ? "linkEvents" : null}
                    onClick={() => {
                                    this.setActive("linkEvents");
                    }}>EVENTS</Link>
                  <div className="dropdown-content">
                    <Link to="" className={(this.state.activeState === "linkEventson") ? "linkEventson" : null}
                    onClick={() => {
                                    this.setActive("linkEventson");
                    }}>ONLINE EVENTS</Link>
                    <Link to="" className={(this.state.activeState === "linkEventsoff") ? "linkEventsoff" : null}
                    onClick={() => {
                                    this.setActive("linkEventsoff");
                    }}>OFFLINE EVENTS</Link>
                  </div>
                </li>
                <li>
                  <Link to="" className={(this.state.activeState === "linkTeam") ? "linkTeam" : null}
                    onClick={() => {
                                    this.setActive("linkTeam");
                    }}>TEAM CONTACT</Link>
                </li>*/}
                <li>
                    <Link to="../sponsors" className={(this.state.activeState === "sponsors") ? "linkSponsors" : null}
                    onClick={() => {
                                    this.setActive("linkSponsors");
                    }}>OUR SPONSORS</Link>
                </li>
                {/* <li>
                  <Link to="" className={(this.state.activeState === "linkFaq") ? "linkFaq" : null}
                    onClick={() => {
                                    this.setActive("linkFaq");
                    }}>FAQs</Link>
                </li>*/}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
