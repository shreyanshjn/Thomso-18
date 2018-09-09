import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../../handlers/main/AuthService";
import List from "./List";
import "./src/css/Navbar.css";

import FetchApi from '../../../utils/FetchAPI';

import img from "./src/img/logo.png";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            hamburger: true,
            isAuthenticated: false,
            activeState: window.location.pathname.substring(1),
            imageData: []
        };
        this.setActive = this.setActive.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/main/getImage', null, token)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        this.setState({ imageData: r.data.body });
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }

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
        let verified = this.state.imageData.verified;
        // let imageUrl = '/img/ProfileImage/' + this.state.imageData.image;
        let imageUrl;
        if (this.state.imageData && this.state.imageData.image) {
            imageUrl = '/uploads/img/ProfileImage/' + this.state.imageData.image
        }
        if (process.env.REACT_APP_SERVER_ENVIORNMENT === "dev") {
            imageUrl = 'https://localhost:' + process.env.REACT_APP_SERVER_PORT + imageUrl
        }
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
                            {!this.state.isHidden && <List events={this.props.events === "true" ? "true" : null} />}
                        </div>
                        <div className="beta-navbar-int-ctos">
                            <ul id="beta-navbar-options-hide">
                                {this.props.events === "true" ? null : <li >
                                    <Link to="/campusambassador/" className={(this.state.activeState === "campusambassador/") ? "linkCaportal" : null}
                                        onClick={() => {
                                            this.setActive("linkCaportal");
                                        }}>
                                        CAMPUS AMBASSADOR
                                    </Link>
                                </li>}
                                {/*<li>
                      <Link to="" className={(this.state.activeState === "linkZonals") ? "linkZonals" : null}
                    onClick={() => {
                                    this.setActive("linkZonals");
                    }}>
                    ZONALS
                </Link>
                </li> */}
                                {this.props.events === "true" ? null : <li >
                                    <Link to="/events" className={(this.state.activeState === "#") ? "linkEvents" : null}
                                        onClick={() => {
                                            this.setActive("#");
                                        }}><span className="events-navbar-new">EVENTS</span><span className="events-delhi-navbar-new">new</span></Link>
                                </li>}
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
                                            }}>SILHOUETTE
                                        </Link>
                                        <Link to="/xpression" style={{ marginLeft: "15px" }} className={(this.state.activeState === "xpression") ? "linkEventson" : null}
                                            onClick={() => {
                                                this.setActive("xpression");
                                            }}>XPRESSION
                                        </Link>
                                        {/*  <Link to="" className={(this.state.activeState === "linkEventsoff") ? "linkEventsoff" : null}
                    onClick={() => {
                                    this.setActive("linkEventsoff");
                    }}>OFFLINE EVENTS</Link>*/}
                                    </div>
                                </li>
                                {this.props.events === "true" ? null : <li>
                                    <Link to="/associate" className={(this.state.activeState === "linkAssociate") ? "linkSponsors" : null}
                                        onClick={() => {
                                            this.setActive("linkAssociate");
                                        }}>ASSOCIATE WITH US</Link>
                                </li>}
                                {this.props.events === "true" ? null : <li>
                                    <Link to="/blog" className={(this.state.activeState === "linkBlog") ? "linkBLog" : null}
                                        onClick={() => {
                                            this.setActive("linkBlog");
                                        }}>BLOG</Link>
                                </li>}
                                {this.props.events === "true" ? null : <li className="dropdown">
                                    <Link to="/zonals/home" className={(this.state.activeState === "lucknow") ? "linkLucknow" : null}
                                        onClick={() => {
                                            this.setActive("lucknow");
                                        }}>ZONALS</Link>
                                </li>}
                                <li>
                                    <Link to="/main" className={(this.state.activeState === "main") ? "linkSponsors" : null}
                                        onClick={() => {
                                            this.setActive("main");
                                        }}>{verified ? (this.state.imageData && this.state.imageData.image) ? <img className="navbar-user-image" src={imageUrl} alt="DASHBOARD" /> : 'DASHBOARD' : <span><span className="events-navbar-new">REGISTER</span><span className="events-delhi-navbar-new">new</span></span>}</Link>

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
