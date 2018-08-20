import React from "react";
import { Link } from "react-router-dom";

// import FetchApi from "../../../utils/FetchAPI";

export default class Sidebar extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        // console.log(this.props);
        return (
            <div>
               {this.props.userData.name ? this.props.userData.name : null}  <br/>
               {this.props.userData.email ? this.props.userData.email : null}<br/>
               <Link to="/main/logout">
                    Logout
                </Link>
            </div>
        );
    }
}
