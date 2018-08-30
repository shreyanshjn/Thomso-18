import React, { Component } from "react";
import { Link } from 'react-router-dom';

import AuthService from "../../../handlers/main/AuthService";
import "./src/css/List.css";

class List extends Component {
    constructor() {
        super();
        this.state = {
            activeStateLink: window.location.pathname.substring(1),
            isAuthenticated: false
        };
        this.setActiveLink = this.setActiveLink.bind(this);
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
                        {this.state.isAuthenticated ? 'DASHBOARD' : 'PARTICIPATE'}
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
