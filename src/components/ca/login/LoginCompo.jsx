import React from "react";

import './LoginCompo.css';
export default class LoginCompo extends React.Component{

  render(){
    return(
    <div>

      <div className="Login-div2">

      <div className="Login-div3">
        <img src={this.props.image}/>
      </div>
      <div className="Login-div4">
        <p>{this.props.data}</p>{this.props.heading}
      </div>
    </div>

    </div>
  );
  }
}
