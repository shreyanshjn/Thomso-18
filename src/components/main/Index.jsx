import React from "react";
import {Route} from "react-router-dom";
import Loadable from "react-loadable";

import FetchApi from "../../utils/FetchAPI";
import AuthService from "../../handlers/main/AuthService";
import Loader from "../common/Loader";

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
// const HomeIndex = Loadable({
//     loader: ()=>import("./Home/Index"),
//     loading: Loading
// });

export default class MainIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            isAuthenticated: false,
            isTemp: true,
            userData: ""
        }
        // this.Auth = new AuthService();
    }

    // componentWillMount() {
    //     const isAuthenticated = this.Auth.hasToken();
    //     console.log(isAuthenticated, "isAuthenticated");
    //     if (isAuthenticated) {
    //       const token = this.Auth.getToken()
    //       FetchApi('GET', '/api/main/user', null, token)
    //         .then(r => {
    //           if (r && r.data && r.data.body) {
    //             if (r.data.body.verified) {
    //               this.setState({ isAuthenticated: true, isTemp: false, userData: r.data.body });
    //             } else {
    //               this.setState({ isAuthenticated: true, isTemp: true })
    //               this.props.history.push('/main/verify')
    //             }
    //           }
    //         })
    //         .catch(e => {
    //           console.log(e)
    //         });
    //     }
    //   }

    // handleUpdate = (isAuthenticated, isTemp) => {
    //     this.setState({ isAuthenticated, isTemp })
    //   };
    
    //   setUserData = data => {
    //     this.setState({
    //       userData: data
    //     });
    //   };

    render(){
        return(
            <React.Fragment>
                   
                              <Route exact path="/main/verify" component={VerifyIndex} />
                           
                            <Route exact path="/main" component={RegisterIndex} />
                            <Route exact path="/main/login" component={LoginIndex} />
            </React.Fragment>
        )
    }

}
