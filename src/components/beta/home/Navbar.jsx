import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../../handlers/main/AuthService";
import List from "./List";
import "./src/css/Navbar.css";

import img from "./src/img/logo.png";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            hamburger: true,
            isAuthenticated: false,
            activeState: window.location.pathname.substring(1)
        };
        this.setActive = this.setActive.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (this.props.detail && this.props.detail.subevents) {
            const filteredData = this.props.detail.subevents.filter(e => e.id === this.props.id);
            if (filteredData) {
                this.setState({ data: filteredData[0], isAuthenticated });
            } else {
                this.setState({ isAuthenticated })
            }
        } else if (isAuthenticated) {
            this.setState({ isAuthenticated })
        }
    }
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            hamburger: !this.state.hamburger
        });
    }
    setActive(state) {
        this.setState({
            activeState: state
        });
    }
    render() {
        return (
            <div className="beta-navbar-contain">
                <div className={this.state.hamburger ? "beta-home-navbar" : "beta-home-navbar beta-navbar-overlay beta-navbar-navbarToggle"} id={(this.props.background === "true") ? "background-image-gradient" : null}>
                    <div className="beta-navbar-t-logo">
                        <Link to="/"> <img src={img} alt="" /></Link>
                    </div>
                    <div className="beta-navbar-t-ctos">
                        <div className="beta-navbar-toggle">
                            <div className={this.state.hamburger ? "beta-navbar-navtoggle fa fa-bars beta-navbar-navtoggle-both" : "fa fa-bars beta-navbar-navtoggle beta-navbar-navtoggle-mobile"} onClick={this.toggleHidden.bind(this)}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className={this.state.isHidden ? "list_" : "list_ beta-navbar-active"}>
                            {!this.state.isHidden && <List />}
                        </div>
                        <div className="beta-navbar-int-ctos">
                            <ul id="beta-navbar-options-hide">
                                <li>
                                    <Link to="/campusambassador/" className={(this.state.activeState === "campusambassador/") ? "linkCaportal" : null}
                                        onClick={() => {
                                            this.setActive("linkCaportal");
                                        }}>
                                        CA PORTAL
                                    </Link>
                                </li>
                                {/*<li>
                      <Link to="" className={(this.state.activeState === "linkZonals") ? "linkZonals" : null}
                    onClick={() => {
                                    this.setActive("linkZonals");
                    }}>
                    ZONALS
                </Link>
                </li> */}
                                <li >
                                    <Link to="/events" className={(this.state.activeState === "#") ? "linkEvents" : null}
                                        onClick={() => {
                                            this.setActive("#");
                                        }}>EVENTS
                                    </Link>
                                </li>
                                {/*    <li>
                  <Link to="" className={(this.state.activeState === "linkTeam") ? "linkTeam" : null}
                    onClick={() => {
                                    this.setActive("linkTeam");
                    }}>TEAM CONTACT</Link>
                </li>*/}
                                <li className="dropdown">
                                    <Link to="#" className="events-online-navbar-option" style={{}}>
                                        ONGOING EVENTS
                                    </Link>
                                    <div className="beta-navbar-dropdown-content">
                                        <Link to="/quizardry" style={{ marginLeft: "15px" }} className={(this.state.activeState === "quizardry") ? "linkEventson" : null}
                                            onClick={() => {
                                                this.setActive("quizardry");
                                            }}>QUIZARDRY
                                        </Link>
                                        <Link to="/campusclicks" style={{ marginLeft: "15px" }} className={(this.state.activeState === "campusclicks") ? "linkEventson" : null}
                                            onClick={() => {
                                                this.setActive("campusclicks");
                                            }}>CAMPUS CLICKS
                                        </Link>
                                        <Link to="/silhoutte" style={{ marginLeft: "15px" }} className={(this.state.activeState === "silhoutte") ? "linkEventson" : null}
                                            onClick={() => {
                                                this.setActive("silhoutte");
                                            }}>SILHOUTTE
                                        </Link>
                                        {/*  <Link to="" className={(this.state.activeState === "linkEventsoff") ? "linkEventsoff" : null}
                    onClick={() => {
                                    this.setActive("linkEventsoff");
                    }}>OFFLINE EVENTS</Link>*/}
                                    </div>
                                </li>
                                <li>
                                    <Link to="/associate" className={(this.state.activeState === "linkAssociate") ? "linkSponsors" : null}
                                        onClick={() => {
                                            this.setActive("linkAssociate");
                                        }}>ASSOCIATE WITH US</Link>
                                </li>
                                <li>
                                    <Link to="/main" className={(this.state.activeState === "main") ? "linkSponsors" : null}
                                        onClick={() => {
                                            this.setActive("main");
                                        }}>{this.state.isAuthenticated ? 'DASHBOARD' : 'PARTICIPATE'}</Link>

                                </li>
                                <li className="dropdown">
                                    <Link to="" className={(this.state.activeState === "lucknow") ? "linkLucknow" : null}
                                        onClick={() => {
                                            this.setActive("lucknow");
                                        }}><span className="zonals-navbar-option">ZONALS</span><span className="zonals-navbar-new">new</span></Link>
                                    <div className="beta-navbar-dropdown-content">
                                        <Link to="/zonals/delhi" className={(this.state.activeState === "delhi") ? "linkLucknow" : null}
                                            onClick={() => {
                                                this.setActive("delhi");
                                            }}><span className="zonals-delhi-navbar-option">DELHI</span><span className="zonals-delhi-navbar-new">new</span></Link>
                                        <Link to="/zonals/lucknow" className={(this.state.activeState === "lucknow") ? "linkLucknow" : null}
                                            onClick={() => {
                                                this.setActive("lucknow");
                                            }}>LUCKNOW</Link>
                                    </div>
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
            </div >
        );
    }
}
export default Navbar;
