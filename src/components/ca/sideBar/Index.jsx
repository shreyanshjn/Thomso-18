import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import boy from "./img/boy.png";
import like from "./img/like.png"
import share from "./img/share.png"
import score from "./img/star.png"
import Post from "./Svg/Post"
import Certificate from "./Svg/Certificate"
import Referral from "./Svg/Referral"
import Leader from "./Svg/Leader"
import Guide from "./Svg/Guide"
import Contact from "./Svg/Contact"
import Logout from "./Svg/Logout"
import Bulb from "./Svg/Bulb"
import Hand from "./Svg/Hand"

// import logoUser from '../common/images/user.svg';

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 69,
      referral: 'AVSHFSAD',
      likes: 69,
      share: 69,
      score: 69,
      activeState: window.location.pathname.substring(1)
    };
    if (window.location.pathname.substring(1) === "") {
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
    let username;
    let college_name;
    // if (localStorage.getItem('name')) {
    // 	username = localStorage.getItem('name')
    // } else if (localStorage.getItem('company_name')) {
    // 	username = localStorage.getItem('company_name')
    // } else {
    username = "JOHN DOE";
    college_name = "John Doe College of Engineering";
    // }
    return (
      <div>
        <div
          id="mySidenav"
          className={
            this.state.activeState === "map"
              ? "sidenav collapseSide"
              : "sidenav"
          }
        >
          <div className="sidebar-user">
            <img src={boy} className="image" />
            <div className="details">
              <div className="text">{username}</div>
              <div className="cname">{college_name}</div>
            </div>
          </div>
          <div className="line">
          </div>
          <div className="likeshare">
            <div className="inls">
              <div className="n_likes">
                <div className="inn_likes">
                  <div>
                    {this.state.likes}
                  </div>
                  <img src={like} />
                </div>
                <div className="plikes">
                  LIKES
                </div>
              </div>
              <div className="n_shares">
                <div className="inn_likes">
                  <div className="change">
                    {this.state.share}
                  </div>
                  <img src={share} />
                </div>
                <div className="plikes">
                  SHARES
                </div>
              </div>
              <div className="n_score">
                <div className="inn_likes">
                  <div className="change">
                    {this.state.score}
                  </div>
                  <img src={score} />
                </div>
                <div className="plikes">
                  SCORES
                </div>
              </div>
            </div>
            <div className="update">
              *Scores willbe updated at 12 am
            </div>
          </div>
          <div className="line">
          </div>
          <div className="thomso">
            <Link
              to="/"
              className={
                this.state.activeState === "posts"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("posts");
              }}
            >
              <div className="posts flex_row">
                <div className="p-logo">
                  <Post />
                </div>
                <div className="p-name">
                  POSTS
                </div>
              </div>
            </Link>
            <Link
              to="/map"
              className={
                this.state.activeState === "leaderboard"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("leaderboard");
              }}
            >
              <div className="leaderboard flex_row">
                <div className="p-logo">
                  <Leader />
                </div>
                <div className="p-name">
                  LEADERBOARD
                </div>
              </div>
            </Link>
            <Link
              to="/map"
              className={
                this.state.activeState === "home"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("home");
              }}
            >
              <div className="guide flex_row">
                <div className="p-logo">
                  <Guide />
                </div>
                <div className="p-name">
                  GUIDELINES
                </div>
              </div>
            </Link>
            <Link
              to="/"
              className={
                this.state.activeState === "home"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("home");
              }}
            >
              <div className="ideas flex_row">
                <div className="p-logo">
                  <Bulb />
                </div>
                <div className="p-name">
                  IDEAS
                </div>
              </div>
            </Link>
            <Link
              to="/"
              className={
                this.state.activeState === "home"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("home");
              }}
            >
              <div className="certificate flex_row">
                <div className="p-logo">
                  <Certificate />
                </div>
                <div className="p-name">
                  CERTIFICATES
                </div>
              </div>
            </Link>
            <Link
              to="/"
              className={
                this.state.activeState === "home"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("home");
              }}
            >
              <div className="contactus flex_row">
                <div className="p-logo">
                  <Contact />
                </div>
                <div className="p-name">
                  CONTACT US
                </div>
              </div>
            </Link>
            <Link
              to="/"
              className={
                this.state.activeState === "home"
                  ? "sideNavItem activeSideItem"
                  : "sideNavItem"
              }
              onClick={() => {
                this.setActive("home");
              }}
            >
              <div className="logout flex_row">
                <div className="p-logo">
                  <Logout />
                </div>
                <div className="p-name">
                  LOGOUT
                </div>
              </div>
            </Link>
            <div
              className={
                this.state.activeState === "home"
                  ? "sideNavItem activeSideItem re"
                  : "sideNavItem re"
              }
              onClick={() => {
                this.setActive("home");
              }}
            >
              <div className="referral flex_row" title="Click to copy">
                <div className="p-logo">
                  <Referral />
                </div>
                <div onClick={this.copytoclipboard} className="p-name">
                  REFERRAL CODE : {this.state.referral}
                </div>
              </div>
            </div>
          </div>
          <div className="hand flex_row">
            <div className="inhand">
              <div className="p-logo">
                <Hand />
              </div>
              <div className="days">
                {this.state.days} DAYS LEFT
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}