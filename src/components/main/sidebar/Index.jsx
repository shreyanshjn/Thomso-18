import React from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
// import "../../ca/sidebar/css/style.css";
import boy from "./img/boy.png";
import girl from "./img/girl.png";
import { addCATopic } from '../../../utils/firebasePush';
// import ReferralPoint from "./Svg/Referralpoint";
// import Bonus from "./Svg/Bonus";
// import Score from "./Svg/Score";
// import share from "./img/share.png"
// import score from "./img/star.png"
import Post from "./Svg/Post"
// import Referral from "./Svg/Referral"
// import Leader from "./Svg/Leader"
import Events from "./Svg/Events"
// import Guide from "./Svg/Guide"
import Contact from "./Svg/Contact"
import Logout from "./Svg/Logout"
// import Bulb from "./Svg/Bulb"
// import Hand from "./Svg/Hand"

// import logoUser from '../common/images/user.svg';

let addTopicTimeout;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referral: 'AVSHFSAD',
      activeState: window.location.pathname.substring(6)
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

    const countDownDate = new Date("Oct 25, 2018 00:00:00").getTime();
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
    return (
      <div>
        <div
          id="mySidenav"
          className="sidenav"
          style={{ backgroundColor: 'white' }}
        >
          <div className="campusAmb-sidebar-user">
            {(this.props.userData && this.props.userData.image) ? <img src={this.props.userData.image} className="image" alt="User" /> :
              <React.Fragment>
                {(this.props.userData && this.props.userData.gender === 'female') ?
                  <img src={girl} className="image" alt="User" /> :
                  <img src={boy} className="image" alt="User" />
                }
              </React.Fragment>}

            <div className="campusAmb-sidebar-user-details">
              <div className="text">{this.props.userData ? this.props.userData.name : "User"}</div>
              <div className="cname">{this.props.userData ? this.props.userData.college : "-"}</div>
            </div>
          </div>
          <div className="campusAmb-sidebar-line">
          </div>
          <div className="campusAmb-sidebar-contents">
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
              <div className="campusAmb-sidebar-posts flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Post />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  PROFILE
                </div>
              </div>
            </Link>
            <Link
              to="/"
              className="sideNavItem"
            >
              <div className="campusAmb-sidebar-posts flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Post />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  HOME
                </div>
              </div>
            </Link>
            <Link
              to="/events"
              className="sideNavItem"
            >
              <div className="campusAmb-sidebar-events flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Events />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
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
              <div className="campusAmb-sidebar-logout flex_row">
                <div className="campusAmb-sidebar-svg-logo">
                  <Logout />
                </div>
                <div className="campusAmb-sidebar-navitem-name">
                  LOGOUT
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
