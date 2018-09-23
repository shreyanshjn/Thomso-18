import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

import FetchApi from "../../utils/FetchAPI";
import AuthService from "../../handlers/coordinators/AuthService";
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
    loader: () => import("./login/Index.jsx"),
    loading: () => <Loader/>
});

const RegisterIndex = Loadable({
    loader: () => import("./register/Index"),
    loading: () => <Loader/>
});



export default class MainIndex extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         isAuthenticated: false,
    //         userData: [],
    //         errors:""
    //     }
    //     this.Auth = new AuthService();
    // }
    
    // componentWillMount() {
    //     const isAuthenticated = this.Auth.hasToken();
    //     if (isAuthenticated) {
    //         const token = this.Auth.getToken()
    //         FetchApi('GET', '/api/coordinators/info', null, token)
    //             .then(r => {
    //                 if (r && r.data && r.data.success && r.data.body) {
    //                     this.setState({isAuthenticated:true, userData: r.data.body });
    //                 }
    //             })
    //             .catch(e => {
    //                 console.log(e)
    //             });
    //     }
    // }

    // handleUpdate = (isAuthenticated) => {
    //     this.setState({ isAuthenticated})
    // };

    // setUserData = data => {
    //     this.setState({
    //         userData: data
    //     });
    // };
   
    render() {
        // let { isAuthenticated, userData} = this.state;
        return (
            <React.Fragment>
                {/* {isAuthenticated ?  */}
                    {/* <React.Fragment> */}
                        {/* <Route  path="/controls/logout" component={LogoutIndex} /> */}
                    {/* </React.Fragment> */}
                    {/* : */}
                    {/* <React.Fragment> */}
                        {/* <Route  path="/controls" render={props => (<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)} /> */}
                        <Route exact path="/controls/register" component={RegisterIndex} />
                        <Route exact path="/controls/" component={LoginIndex} />
                    {/* </React.Fragment> */}
                {/* } */}
            </React.Fragment>
        )
    }

}
