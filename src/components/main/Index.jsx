import React from "react";
import {Route} from "react-router-dom";
import Loadable from "react-loadable";

import FetchApi from "../../utils/FetchAPI";
import AuthService from "../../handlers/main/AuthService";
import Loader from "../common/Loader";
import ResetIndex from "../campusAmbassador/reset/Index";

const Loading = ({error})=>{
    if(error)
        return <div>Error loading component</div>;
    else
        return <Loader />;
};

const RegisterIndex = Loadable({
    loader : ()=> import("./Registration/Index"),
    loading: Loading
});

// const LoginIndex = Loadable({
//     loader: ()=>import("./Login/Index"),
//     loading: Loading
// });

const VerifyIndex = Loadable({
    loader: ()=>import("./Verify/Index"),
    loading: Loading
});

export default class MainIndex extends React.Component{
    constructor(){
        super();
        this.state = {

        }
        this.Auth = new AuthService();
    }
    render(){
        return(
            <React.Fragment>
                    <Route exact path="/main" component={RegisterIndex} />
                    <Route exact path="/main/verify" component={VerifyIndex} />

                    {/* <Route exact path="/main/login" render={props => {<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />} } /> */}
            </React.Fragment>
        )
    }

}
