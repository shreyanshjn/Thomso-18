import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

import AuthService from '../../handlers/ca/temp/AuthService';
import Loader from "../common/Loader";

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
      isTemp: true
    }
    this.Auth = new AuthService();
  }

  componentWillMount() {
    const isAuthenticated = this.Auth.hasToken();
    const isTemp = this.Auth.isTemp();
    console.log(isTemp, "isTemp");
    console.log(isAuthenticated, "isAuthenticated");
    if (isAuthenticated) {
      // const token = this.Auth.getToken()
      // FetchApi('GET', '/api/ca/auth/fbData', null, token)
      //   .then(r => {
      //     if (r && r.data && r.data.body) {
            this.setState({ 
              isAuthenticated,
              isTemp
              // userData: r.data.body
            });
        //   }
        // })
        // .catch(e => console.log(e));
    }
  }

  handleUpdate = (isAuthenticated, isTemp) => {
    this.setState({ isAuthenticated, isTemp });
  };
  
  render() {
    return (
      <React.Fragment >
        {this.state.isAuthenticated ? 
          <React.Fragment>
            {this.state.isTemp ? 
              <Route exact path="/campusAmbassador/*" render={props => (<ResetIndex {...props} updateRoutes={this.handleUpdate} />)} />
              :
              <React.Fragment>
                <Route exact path="/campusAmbassador" component={HomeIndex} />
              </React.Fragment>
            }
            <Route exact path="/campusAmbassador/logout" render={props => (<LogoutIndex {...props} updateRoutes={this.handleUpdate} />)} />
          </React.Fragment>
          :
          <React.Fragment>
            <Route exact path="/campusAmbassador" component={HomeIndex} />
            <Route exact path="/campusAmbassador/register" component={RegisterIndex} />
            <Route exact path="/campusAmbassador/login" render={props => (<LoginIndex {...props} updateRoutes={this.handleUpdate} />)} />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
