import React from "react";
import { Link } from "react-router-dom";

// import FetchApi from "../../../utils/FetchAPI";

export default class HomeIndex extends React.Component{
    render(){
        return (
            <div>
               hello
               <br></br>
                <Link to="/main/register">
                    register
                </Link>
                <br/>
                <Link to="/main/login">
                    Login
                </Link>
               <br></br>
                <Link to="/main/resetPasswordEmail">
                    Forget Password
                </Link>
            </div>
        );
    }
}
