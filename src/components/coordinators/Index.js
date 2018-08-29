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
    loader: () => import("./home/Index"),
    loading: Loading
});

export default class MainIndex extends React.Component {

    render() {
        return (
            <React.Fragment>
                {console.log('hello')}
                <Route exact path="/coordinators/register" component={HomeIndex} />
                helo
                {console.log('hello')}
            </React.Fragment>
        )
    }

}
