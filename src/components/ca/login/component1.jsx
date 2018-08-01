import React from "react";

import './component1.css';
export default class DivComponent1 extends React.Component{

  render(){
    return(
    <div>

      <div className="div2">

      <div className="div3">
        <img src={this.props.image}/>
      </div>
      <div className="div4">
        <p>{this.props.data}</p>{this.props.heading}
      </div>
    </div>

    </div>
  );
  }
}
