import React, { Component } from 'react';
import Parallax from 'parallax-js';
import gate from '../src/img/indiagate.png';
import cloud from '../src/img/cloud.png';
import '../src/css/DelhiOpening.css';
import logo from '../src/img/logo.png'; 
import iitrlogo from '../src/img/iitrlogo.png';
export default class DelhiOpening extends Component {
    constructor(props) {
        super(props);
        this.state={
            scene:0
        }
    }
    componentDidMount()
    {
        if(!scene)
        {
            var scene = document.getElementById('scene');
            var parallaxInstance = new Parallax(scene);
        }
    }
    render() {
        return (
            <div id="scene" className="zonals-scene">
                <div data-depth="0" className="zonals-gate-div layer">
                    <img src={gate} alt="indiagate" data-hover-only="true"  className="zonals-india-gate"/>
                    <div  data-depth="0.8" className="zonals-zones layer">
                        <h1>DELHI ZONALS</h1>
                    </div>
                </div>
                <div data-depth="0">
                    <img src={logo} className="zonals-delhi-logo" alt="logo"/> 
                </div>
                <div data-depth="0.7"> 
                    <img src={cloud} alt="cloud"  className="zonals-cloud-two"/>
                </div>
                <div data-depth="0.4"> 
                    <img src={cloud} alt="cloud"  className="zonals-cloud-one"/>
                </div>
                <div data-depth="0.6"> 
                    <img src={cloud} alt="cloud"  className="zonals-cloud-three"/>
                </div>
            </div>
        );
    }
}

