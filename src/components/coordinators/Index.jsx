import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

import FetchApi from "../../utils/FetchAPI";
import AuthService from "../../handlers/main/AuthService";
import Loader from "../common/Loader";

const Loading = ({ error }) => {
    if (error)
        return <div>Error loading component</div>;
    else
        return <Loader />;
};

const HomeIndex = Loadable({
    loader: () => import("./home/Index.jsx"),
    loading: Loading
});

const LoginIndex = Loadable({
    loader: () => import("./login/Index.jsx"),
    loading: Loading
});

const RegisterIndex = Loadable({
    loader: () => import("./register/Index"),
    loading: () => <Loader/>
});

export default class MainIndex extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* {console.log('hello')} */}
                {/* <Route exact path="/coordinators/login" component={HomeIndex} /> */}
                {/* <Route  path="/coordinators" component={LoginIndex} /> */}
                <Route exact path="/coordinators/" component={RegisterIndex} />
            </React.Fragment>
        )
    }

}
