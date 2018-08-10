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

                <div className="zonals-parallax-layer1 layer">
                    <div className="zonals-parallax-layer1-main-child">
                        <div data-depth="0">
                            <img src={logo} className="zonals-delhi-logo" alt="logo"/> 
                        </div>
                        <div data-depth="0">
                            <img src={iitrlogo} className="zonals-delhi-iitrlogo" alt="iitrlogo" />
                        </div>
                    </div>
                </div>

                <div  data-depth="1" className="zonals-parallax-layer3">
                    <div className="zonals-parallax-layer3-main-child">
                        <div data-depth="0.7" className="parallax-layer3-child"> 
                            <img src={cloud} alt="cloud"  className="zonals-cloud-two"/>
                        </div>
                    </div>
                </div>

                <div data-depth="0" className="zonals-gate-div zonals-parallax-layer2 layer">
                    <div className="zonals-parallax-layer2-main-child">
                        <div className="parallax-layer2-child">
                            <img src={gate} alt="indiagate" data-hover-only="true"  className="zonals-india-gate"/>
                            <h1 className="zonals-layer2-h1">DELHI ZONALS</h1>
                        </div>
                    </div>
                </div>

                <div  data-depth="0.5"className="zonals-parallax-layer4">
                    <div className="zonals-parallax-layer4-main-child">
                        <div data-depth="0.4" className="parallax-layer4-child"> 
                            <img src={cloud} alt="cloud"  className="zonals-cloud-one"/>
                        </div>
                    </div>
                </div>

                <div  data-depth="0.2"className="zonals-parallax-layer5">
                    <div className="zonals-parallax-layer5-main-child">
                        <div data-depth="0.6" className="parallax-layer5-child"> 
                            <img src={cloud} alt="cloud"  className="zonals-cloud-three"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

