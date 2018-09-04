import React from "react";
import { Link } from "react-router-dom";

import { addCATopic } from '../../../utils/firebasePush';

import UpdateImage from './UpdateImage'

import "./css/style.css";

import Profile from "./Svg/Profile"
import Events from "../../campusAmbassador/sidebar/Svg/Events"
import Contact from "../../campusAmbassador/sidebar/Svg/Contact"
import Logout from "../../campusAmbassador/sidebar/Svg/Logout"
import Home from "./Svg/Home"
import Post from "./Svg/Post"
import Bulb from "./Svg/Bulb"
import boy from "./img/boy.png";
import girl from "./img/girl.png";

let addTopicTimeout;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referral: 'AVSHFSAD',
      activeState: window.location.pathname.substring(6),
      errors: '',
      days: 0
    };
    if (!window.location.pathname.substring(6)) {
      this.state = {
        activeState: "profile"
      };
    }
  }
  componentWillMount() {
    clearTimeout(addTopicTimeout)
  }

  componentDidMount() {
    addTopicTimeout = setTimeout(() => {
      addCATopic('tempCA');
    }, 2000)

    const countDownDate = new Date("Oct 27, 2018 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (days < 0) {
      days = 0;
    }
    this.setState({ days })
  }

  setActive(state) {
    this.setState({ activeState: state });
  }

  copytoclipboard = () => {
    let Field = this.state.referral;
    Field.execCommand('copy');
    Field.remove()
  }

  render() {
    let user
    // console.log(this.props.userData);
    if (this.props.userData && this.props.userData.image) {
      user = '/uploads/img/ProfileImage/' + this.props.userData.image
    }
    if (process.env.REACT_APP_SERVER_ENVIORNMENT === "dev") {
      user = 'https://localhost:' + process.env.REACT_APP_SERVER_PORT + user
    }
    return (
      <div>
        <div
          id="mySidenav"
          className="sidenav"
          style={{ backgroundColor: 'white' }}
        >
          <div className="main-sidebar-user">
            <div className="main-sidebar-user-child">
            {/* {console.log(this.props.userData)} */}
              {(this.props.userData && this.props.userData.image) ? <img src={user} className="image" alt="User" /> :
                <React.Fragment>
                  {(this.props.userData && this.props.userData.gender === 'female') ?
                    <img src={girl} className="image" alt="User" /> :
                    <img src={boy} className="image" alt="User" />
                  }
                </React.Fragment>}
            </div>
            <div className="main-sidebar-user-details">
              <div className="text">{this.props.userData ? this.props.userData.name : "User"}</div>
              <div className="cname">{this.props.userData ? this.props.userData.college : "-"}</div>
              <div>
                <UpdateImage imagePrev={(data) => this.setState({ img: data })} imageUpdated={(data) => data ? this.setState({ errors: 'Image updated successfully' }) : this.setState({ errors: 'Unable to update image' })} />
              </div>
            </div>
          </div>
          <div className="main-sidebar-line">
          </div>
          <div className="main-sidebar-contents">
            <Link
              to="/main/"
              className={
                (this.state.activeState === "profile")
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("profile");
              }}
            >
              <div className="main-sidebar-profile flex_row">
                <div className="main-sidebar-svg-logo">
                  <Profile />
                </div>
                <div className="main-sidebar-navitem-name">
                  PROFILE
                </div>
              </div>
            </Link>
            <Link
              to="/events"
              className="sideNavItem"
            >
              <div className="main-sidebar-events flex_row">
                <div className="main-sidebar-svg-logo">
                  <Events />
                </div>
                <div className="main-sidebar-navitem-name">
                  EVENTS
                </div>
              </div>
            </Link>
            <Link
              to="/main/contact"
              className={
                this.state.activeState === "contact"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("contact");
              }}
            >
              <div className="main-sidebar-contactus flex_row">
                <div className="main-sidebar-svg-logo">
                  <Contact />
                </div>
                <div className="main-sidebar-navitem-name">
                  CONTACT US
                </div>
              </div>
            </Link>
            <Link
              to="/main/post"
              className={
                (this.state.activeState === "post")
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("post");
              }}
            >
              <div className="main-sidebar-profile flex_row">
                <div className="main-sidebar-svg-logo">
                  <Post />
                </div>
                <div className="main-sidebar-navitem-name">
                  RECENT UPDATES
                </div>
              </div>
            </Link>
            <Link
              to="/main/zonals"
              className={
                (this.state.activeState === "zonals")
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("zonals");
              }}
            >
              <div className="main-sidebar-ideas flex_row">
                <div className="main-sidebar-svg-logo">
                  <Bulb />
                </div>
                <div className="main-sidebar-navitem-name">
                  ZONALS
                </div>
              </div>
            </Link>
            <Link
              to="/"
              className="sideNavItem"
            >
              <div className="main-sidebar-profile flex_row">
                <div className="main-sidebar-svg-logo">
                  <Home />
                </div>
                <div className="main-sidebar-navitem-name">
                  HOME
                </div>
              </div>
            </Link>
            <Link
              to="/main/logout"
              className={
                this.state.activeState === "logout"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("logout");
              }}
            >
              <div className="main-sidebar-logout flex_row">
                <div className="main-sidebar-svg-logo">
                  <Logout />
                </div>
                <div className="main-sidebar-navitem-name">
                  LOGOUT
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div >
    );
  }
}
