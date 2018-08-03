import React from "react";

import './src/css/LoginDivCompo.css';
export default class LoginDivCompo extends React.Component{

  render(){
    return(
    <div>

      <div className="Login-diva">

      <div className="Login-divb">
        <img src={this.props.image} alt="logindiv"/>
      </div>
      <div className="Login-divc">
         {this.props.data}
      </div>
    </div>

    </div>
  );
  }
}
