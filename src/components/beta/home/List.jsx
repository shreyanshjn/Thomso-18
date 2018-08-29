import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./src/css/List.css";

class List extends Component {
    constructor() {
        super();
        this.state = {
            activeStateLink: window.location.pathname.substring(1)
        };
        this.setActiveLink = this.setActiveLink.bind(this)
    }
    setActiveLink(state) {
        this.setState({
            activeStateLink: state
        })

    }
    render() {
        return (
            <ul className="beta-home-list">
                <li>
                    <Link to="../campusambassador" className={(this.state.activeStateLink
                        === "list-ca-link") ? "list-ca-link" : null}
                        onClick={() => {
                            this.setActiveLink("list-ca-link")
                        }}>
                        CA PORTAL
                    </Link>
                </li>
                {/*       <li>
          <a href="">ZONALS</a>
        </li>*/}
                <li>
                    <Link to="../quizardry" className={(this.state.activeStateLink === "quizardry") ? "list-quiz-link" : null}
                        onClick={()=>{
                            this.setActiveLink("quizardry");
                        }}>
                QUIZARDRY
                    </Link>
                </li>
                <li>
                    <Link to="/campusclicks" className={(this.state.activeStateLink === "campusclicks") ? "list-quiz-link" : null}
                        onClick={()=>{
                            this.setActiveLink("campusclicks");
                        }}>
                CAMPUS CLICKS
                    </Link>
                </li>
                {/*<li>
          <a href="">OFFINE EVENTS</a>
        </li>*/}
                {/* <li>
          <a href="">TEAM CONTACT</a>
        </li>*/}
                <li>
                    <Link to="/associate" className={(this.state.activeStateLink === "linkAssociate") ? "list-spons-link" : null}
                        onClick={() => {
                            this.setActiveLink("linkAssociate")
                        }}>
                        ASSOCIATE WITH US
            </Link>
                </li>
                <li>
                    <Link to="/main" className={(this.state.activeStateLink === "main") ? "list-spons-link" : null}
                        onClick={() => {
                            this.setActiveLink("main")
                        }}>
                        PARTICIPATE
            </Link>
                </li>
                <li>
                    <Link to="/zonals/delhi" className={(this.state.activeStateLink === "zonals-delhi") ? "list-zonals-link" : null}
                        onClick={() => {
                            this.setActiveLink("list-zonals-delhi")
                        }}>
                        DELHI-ZONALS
            </Link>
                </li>
                <li>
                    <Link to="/zonals/lucknow" className={(this.state.activeStateLink === "zonals-lucknow") ? "list-zonals-lucknow" : null}
                        onClick={() => {
                            this.setActiveLink("list-zonals-lucknow")
                        }}>
                        LUCKNOW-ZONALS
            </Link>
                </li>

                {/* <li>
          <a href="">FAQs</a>
        </li>*/}
            </ul>
        );
    }
}

export default List;
