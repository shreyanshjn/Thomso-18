import React from "react";

import './src/css/LoginCompo.css';
export default class LoginCompo extends React.Component{

  render(){
    return(
    <div>

      <div className="Login-div2">

      <div className="Login-div3">
        <img src={this.props.image}/>
      </div>
      <div className="Login-div4">
       <p className="Login-para">{this.props.heading}</p> {this.props.data}
      </div>
    </div>

    </div>
  );
  }
}
