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

const LoginIndex = Loadable({
    loader: ()=>import("./Login/Index"),
    loading: Loading
});

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

    componentWillMount(){

    }

    render(){
        return(
            <React.Fragment>
                {this.state.isAuthenticated ?
                <React.Fragment>
                    {this.state.isTemp ? 
                        <Route exact path="/main/*" render={props=>(<VerifyIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />)}/>
                    :
                        <Route exact path="/main" render={props=>(<Details {...props} userData={this.state.userData} />)} />
                    }
                </React.Fragment>
                :
                <React.Fragment>
                    <Route exact path="/main" component={HomeIndex} />
                    <Route exact path="/main/register" component={RegisterIndex} />
                    <Route exact path="/main/login" render={props => {<LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} />} } />
                </React.Fragment>
                }
            </React.Fragment>
        )
    }

}
