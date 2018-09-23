import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../../common/Loader";

const loading = ({ error }) => {
    if (error) {
        return <div>Error loading component</div>;
    } else {
        return <Loader />;
    }
};

const behindmyscenes = Loadable({
    loader: () => import("./blog1/index"),
    loading: loading
});

const litfest = Loadable({
    loader: () => import("./blog2/index"),
    loading: loading
});

export default class BlogIndex extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/blog/blog1" component={behindmyscenes} />
                <Route path="/blog/blog2" component={litfest} />
            </React.Fragment>
        );
    }
}