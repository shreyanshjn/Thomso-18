import React from 'react';
import "./loader.css" ;
export default class Loader extends React.Component{
    render(){
        return (
            <div className="common-loader-parent">
                <div className="common-loader-loader">Loading...</div>
            </div>
        )
    }
}