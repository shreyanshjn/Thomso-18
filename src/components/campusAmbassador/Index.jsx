import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

import FetchApi from '../../utils/FetchAPI';
import AuthService from '../../handlers/ca/temp/AuthService';
import Loader from "../common/Loader";
import Sidebar from "./sidebar/Index";
import LeaderboardIndex from "./leaderboard/Index";
import ContactIndex from "./contactus/Index";
import GuideIndex from "./guidelines/Index";
import PostIndex from "./posts/Index";
import EventsIndex from "./events/Index";

const Loading = ({ error }) => {
  if (error) {
    return <div>Error loading component</div>;
  } else {
    return <Loader />;
  }
};

const RegisterIndex = Loadable({
  loader: () => import("./register/Index"),
  loading: Loading
});

const LoginIndex = Loadable({
  loader: () => import("./login/Index"),
  loading: Loading
});

const HomeIndex = Loadable({
  loader: () => import("./home/Index"),
  loading: Loading
});

const LogoutIndex = Loadable({
  loader: () => import("./logout/Index"),
  loading: Loading
});

const ResetIndex = Loadable({
  loader: () => import("./reset/Index"),
  loading: Loading
});

export default class CampusIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      isTemp: true,
      userData: ""
    }
    this.Auth = new AuthService();
  }

  componentWillMount() {
    const isAuthenticated = this.Auth.hasToken();
    console.log(isAuthenticated, "isAuthenticated");
    if (isAuthenticated) {
      const token = this.Auth.getToken()
      FetchApi('GET', '/api/ca/temp/info', null, token)
        .then(r => {
          if (r && r.data && r.data.body) {
            if (r.data.body.verified) {
              this.setState({ isAuthenticated: true, isTemp: false, userData: r.data.body });
            } else {
              this.setState({ isAuthenticated: true, isTemp: true })
              this.props.history.push('/CampusAmbassador/reset')
            }
          }
        })
        .catch(e => {
          console.log(e)
        });
    }
  }

  handleUpdate = (isAuthenticated, isTemp) => {
    this.setState({ isAuthenticated, isTemp })
  };

  setUserData = data => {
    this.setState({
      userData: data
    });
  };
  render() {
    return (
      <React.Fragment >
        {this.state.isAuthenticated ?
          <React.Fragment>
            {this.state.isTemp ?
              <Route exact path="/campusAmbassador/*" render={props => (<ResetIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} />
              :
              <React.Fragment>
                <Route path="/campusAmbassador" render={props => (<Sidebar {...props} userData={this.state.userData} />)} />
                <Route exact path="/campusAmbassador/leaderboard" render={props => (<LeaderboardIndex {...props} userData={this.state.userData} />)} />
                <Route exact path="/campusAmbassador/contact" render={props => (<ContactIndex {...props} userData={this.state.userData} />)} />
                <Route exact path="/campusAmbassador/guidelines" component={GuideIndex} />
                <Route exact path="/campusAmbassador/events" component={EventsIndex} />
                <Route exact path="/campusAmbassador" component={PostIndex} />
              </React.Fragment>
            }
            <Route exact path="/campusAmbassador/logout" render={props => (<LogoutIndex {...props} updateRoutes={this.handleUpdate} />)} />
          </React.Fragment>
          :
          <React.Fragment>
            <Route exact path="/campusAmbassador" component={HomeIndex} />
            <Route exact path="/campusAmbassador/register" component={RegisterIndex} />
            <Route exact path="/campusAmbassador/login" render={props => (<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
