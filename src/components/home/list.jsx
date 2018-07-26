import React, { Component } from "react";

import "./css/list.css";

class List extends Component {
  render() {
    return (
      <ul className="list">
        <li>
          <a href="">CA PORTAL</a>
        </li>
        <li>
          <a href="">ZONALS</a>
        </li>
        <li>
          <a href="">ONLINE EVENTS</a>
        </li>
        <li>
          <a href="">OFFINE EVENTS</a>
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
    );
  }
}

export default List;
