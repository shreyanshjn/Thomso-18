import React from "react";
import './WISCA.css'
import DivComponent from './divcomponent.jsx';
export default class WISCA extends React.Component{
  render(){
    let sj="this is shreyansh"
    return(
    <div className="fullpage">
      <div className="MAINDIV">

                <div className="Heading">
                  WHAT IS CA?
                </div>
                <div className="main">
                  <div className="innermain1">
                      <DivComponent data={sj}/>
                  </div>
                  <div className="innermain2">
                      <DivComponent data="hye"/>
                  </div>

                </div>

                <div className="main2">
                  <div className="innermain1">
                      <DivComponent data="ok"/>
                  </div>
                  <div className="innermain2">
                      <DivComponent data="person"/>
                  </div>
                </div>
    </div>
    </div>
  );
  }
}
