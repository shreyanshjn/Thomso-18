import React from "react";

import './divcomponent.css';
export default class DivComponent extends React.Component{

  render(){
    return(
    <div>

      <div className="diva">

      <div className="divb">
        <img src={this.props.image}/>
      </div>
      <div className="divc">
         {this.props.data}
      </div>
    </div>

    </div>
  );
  }
}
