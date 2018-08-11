import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import boy from "./img/boy.png";
import like from "./img/like.png"
import share from "./img/share.png"
import score from "./img/star.png"
import Post from "./Svg/Post"
import Referral from "./Svg/Referral"
import Leader from "./Svg/Leader"
import Guide from "./Svg/Guide"
import Contact from "./Svg/Contact"
import Logout from "./Svg/Logout"
import Bulb from "./Svg/Bulb"
import Hand from "./Svg/Hand"

// import logoUser from '../common/images/user.svg';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referral: 'AVSHFSAD',
      activeState: window.location.pathname.substring(4)
    };
    if (!window.location.pathname.substring(4)) {
      this.state = {
        activeState: "home"
      };
    }
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
    let countDownDate = new Date("Oct 25, 2018 00:00:00").getTime();
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (days < 0) {
      days = 0;
    }

    return (
      <div>
        {console.log(this.props.userData, 'UserData')}
        <div
          id="mySidenav"
          className="sidenav"
          style={(this.props.userData && this.props.userData.gender === "female") ? { backgroundColor: 'Pink' } : { backgroundColor: 'white' }}
        >
          <div className="campusAmb-sidebar-user">
            <img src={(this.props.userData && this.props.userData.image) ? this.props.userData.image : boy} className="image" alt="dataImg" />
            <div className="campusAmb-sidebar-user-details">
              <div className="text">{this.props.userData ? this.props.userData.name : "User"}</div>
              <div className="cname">{this.props.userData ? this.props.userData.college : "-"}</div>
            </div>
          </div>
          <div className="campusAmb-sidebar-line">
          </div>
          <div className="campusAmb-sidebar-contents">
            <Link
              to="/CampusAmbassador/posts"
              className={
                (this.state.activeState === "posts")
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("posts");
              }}
            >
              <div className="campusAmb-sidebar-posts flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Post />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  POSTS
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/leaderboard"
              className={
                this.state.activeState === "leaderboard"
                  ? "sideNavItem activeSideItem "
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("leaderboard");
              }}
            >
              <div className="campusAmb-sidebar-leaderboard flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Leader />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  LEADERBOARD
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/guidelines"
              className={
                this.state.activeState === "guidelines"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("guidelines");
              }}
            >
              <div className="campusAmb-sidebar-guide flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Guide />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                    GUIDELINES
                </div>
              </div>
            </Link>
            {/*  <Link
              to="/CampusAmbassador/ideas"
              className={
                this.state.activeState === "ideas"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("ideas");
              }}
            >
              <div className="campusAmb-sidebar-ideas flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Bulb />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  IDEAS
                </div>
              </div> 
            </Link>*/}
            {/* <Link
              to="/ca/certificate"
              className={
                this.state.activeState === "certificate"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("certificate");
              }}
            >
              <div className="campusAmb-sidebar-certificate flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Certificate /> 
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  CERTIFICATE
                </div>
              </div>
            </Link> */}
            <Link
              to="/CampusAmbassador/contact"
              className={
                this.state.activeState === "contact"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("contact");
              }}
            >
              <div className="campusAmb-sidebar-contactus flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Contact />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  CONTACT US
                </div>
              </div>
            </Link>
            <Link
              to="/CampusAmbassador/logout"
              className={
                this.state.activeState === "logout"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("logout");
              }}
            >
              <div className="campusAmb-sidebar-logout flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Logout />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  LOGOUT
                </div>
              </div>
            </Link>
            {/*<div
              className="sideNavItem re"
            >
              <div onClick={() => { window.location.href = this.props.userData.link }} className="referral flex_row" title="Click to copy">
                <div className="campusAmb-sidebar-svg-logo">
                  <Referral />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  VISIT FACEBOOK PROFILE
                </div>
              </div>
            </div>*/}
          </div>
          <div className="campusAmb-sidebar-hand flex_row">
            <div className="campusAmb-sidebar-hand-child">
              <div className="campusAmb-sidebar-svg-logo">
                <Hand />
              </div>
              <div className="campusAmb-sidebar-hand-days">
                {days} DAYS LEFT
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
