import React from "react";

import './divcomponent.css';
export default class DivComponent extends React.Component{
  render(){
    return(
    <div>

      <div className="div2">

      <div className="div3">
        dkj
      </div>
      <div className="div4">
        {this.props.data}
      </div>
    </div>

    </div>
  );
  }
}
