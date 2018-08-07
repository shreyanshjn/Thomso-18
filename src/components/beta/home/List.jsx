import React, { Component } from "react";
import {Link} from 'react-router-dom';
import "./src/css/List.css";

class List extends Component {
    constructor() {
        super();
        this.state={
            activeStateLink: window.location.pathname.substring(1)
        };
        this.setActiveLink=this.setActiveLink.bind(this)
    }
    setActiveLink(state)
    {
        this.setState({
            activeStateLink:state
        })

    }
    render() { 
        return (
            <ul className="beta-home-list">
                <li>
                    <Link to="../ca" className={(this.state.activeStateLink
                        === "list-ca-link") ? "list-ca-link" : null } 
                        onClick={()=>{
                            this.setActiveLink("list-ca-link")
                        }}>
                        CA PORTAL
                    </Link>
                </li>
                {/*       <li>
          <a href="">ZONALS</a>
        </li>*/}
        <li>
            <Link to="../quizardy" className={(this.state.activeStateLink === "quizardy") ? "list-quiz-link" : null}
                onClick={()=>{
                this.setActiveLink("quizardy")
                }}>
                QUIZARDY
            </Link>
        </li>
        {/*<li>
          <a href="">OFFINE EVENTS</a>
        </li>*/}
        {/* <li>
          <a href="">TEAM CONTACT</a>
        </li>*/}
        <li>
            <Link to="./sponsors" className={(this.state.activeStateLink === "sponsors") ? "list-spons-link" : null }
                onClick={()=>{
                this.setActiveLink("list-spons-ca")
                }}>
                OUR SPONSORS
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
