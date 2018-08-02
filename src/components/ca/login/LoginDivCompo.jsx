import React from "react";

import './LoginDivCompo.css';
export default class LoginDivCompo extends React.Component{

  render(){
    return(
    <div>

      <div className="Login-diva">

      <div className="Login-divb">
        <img src={this.props.image}/>
      </div>
      <div className="Login-divc">
         {this.props.data}
      </div>
    </div>

    </div>
  );
  }
}
