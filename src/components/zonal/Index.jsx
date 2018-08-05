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

const AdminIndex = Loadable({
  loader: () => import("./admin/Index"),
  loading: Loading
});

export default class ZonalsIndex extends React.Component {
  render() {
    return (
      <React.Fragment>
        {console.log('hello')}
        <Route path="/zonals/admin" component={AdminIndex} />
      </React.Fragment>
    );
  }
}

