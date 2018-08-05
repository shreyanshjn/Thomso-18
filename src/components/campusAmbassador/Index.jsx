import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
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

const HomeIndex = Loadable({
  loader: () => import("./home/Index"),
  loading: Loading
});


export default class CampusIndex extends React.Component {
  render() {
    return (
      <React.Fragment >
        <Route exact path="/campusAmbassador" component={HomeIndex} />
        <Route exact path="/campusAmbassador/register" component={RegisterIndex} />
      </React.Fragment>
    );
  }
}
