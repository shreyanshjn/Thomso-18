import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

import FetchApi from "../../utils/FetchAPI";
import AuthService from "../../handlers/controls/";
import Loader from "../common/Loader";

const Loading = ({ error }) => {
    if (error)
        return <div>Error loading component</div>;
    else
        return <Loader />;
};

// const HomeIndex = Loadable({
//     loader: () => import("./home/Index.jsx"),
//     loading: Loading
// });

const LoginIndex = Loadable({
    loader: () => import("./login/Index"),
    loading: () => Loading
});

const RegisterIndex = Loadable({
    loader: () => import("./register/Index"),
    loading: () => Loading
});

const HomeIndex = Loadable({
    loader: () => import("./home/Index"),
    loading: () => Loading
});



export default class MainIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            userData: [],
            errors:""
        }
        this.Auth = new AuthService();
    }
    
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        console.log(isAuthenticated)
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            console.og(token)
            FetchApi('GET', '/api/controls/info', null, token)
                .then(r => {
                    if (r && r.data && r.data.success && r.data.body) {
                        console.log(r.data)
                        this.setState({isAuthenticated:true, userData: r.data.body });
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    handleUpdate = (isAuthenticated) => {
        this.setState({ isAuthenticated})
    };

    setUserData = data => {
        this.setState({
            userData: data
        });
    };
   
    render() {
        let { isAuthenticated, userData} = this.state;
        return (
            <React.Fragment>
                {isAuthenticated ? 
                     <React.Fragment> 
                        <Route  path="/controls" component={HomeIndex} />
                         <Route  path="/controls/logout" component={LogoutIndex} /> 
                     </React.Fragment> 
                     : 
                     <React.Fragment> 
                         <Route exact path="/controls" render={props => (<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} /> 
                        <Route  path="/controls/register" component={RegisterIndex} />
                     </React.Fragment> 
                 } 
            </React.Fragment>
        )
    }

}
