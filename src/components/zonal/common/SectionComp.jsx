import React, { Component } from 'react';
import '../src/css/SectionComp.css';
export default class SectionComp extends React.Component {
    render() {
        return (
            <div className="zonals-common-comp1">
                <div className="zonal-common-comp1-heading">
                    {this.props.heading}
                </div>
                <div className="zonal-common-comp1-content">
                    {this.props.content} 
                </div>
                <div className="zonal-common-comp1-register">
                    REGISTER NOW
                </div>
            </div>
        );
    }
}
