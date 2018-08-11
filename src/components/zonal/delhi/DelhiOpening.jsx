import React, { Component } from 'react';
import Parallax from 'parallax-js';
import gate from '../src/img/indiagate.png';
import cloud from '../src/img/cloud.png';
import '../src/css/DelhiOpening.css';
import logo from '../src/img/logo.png'; 
import iitrlogo from '../src/img/iitrlogo.png';
import { Link } from 'react-router-dom' ;
export default class DelhiOpening extends Component {
    componentDidMount()
    {
        const scene = document.getElementById('delhi-zonals-parallax');
        if (scene) {
            var parallaxInstance = new Parallax(scene);
        }
    }
    render() {
        return (
            <div className="main-zonals-div">
                <div style={{display:'flex'}}>
                    <div data-depth="0">
                        <Link to="/"><img src={logo} className="zonals-delhi-side-logo" alt="logo"/></Link>
                    </div>
                    <div data-depth="0">
                        <img src={iitrlogo} className="zonals-delhi-iitrlogo" alt="iitrlogo" />
                    </div>
                </div>
                <div id="delhi-zonals-parallax" className="zonals-scene">

                    <div className="zonals-parallax-layer1">
                    </div>

                    <div  data-depth="0.6" className="zonals-parallax-layer3">
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

                    <div  data-depth="0.4"className="zonals-parallax-layer4">
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
            </div>
        );
    }
}

