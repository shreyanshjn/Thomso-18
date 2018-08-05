import React, { Component } from 'react';
import Parallax from 'parallax-js';
import gate from '../src/img/indiagate.png';
import cloud from '../src/img/cloud.png';
import '../src/css/DelhiOpening.css';
export default class DelhiZonal extends Component {
    constructor()
    {
        super();
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
                <div data-depth="0.2" className="zonals-gate-div">
                    <div data-depth="0.3">
                        <img src={gate} alt="indiagate" data-hover-only="true"  className="zonals-india-gate"/>
                        <div data-depth="0.3">
                            <h1  className="zonals-zones">DELHI ZONALS</h1>
                        </div>
                    </div>
                </div>
                <div data-depth="0.5">
                    <img src={cloud} alt="cloud"  className="zonals-cloud-two"/>
                </div>
                <div data-depth="0.2">
                    <img src={cloud} alt="cloud"  className="zonals-cloud-three"/>
                </div>
                <div data-depth="0.5">
                    <img src={cloud} alt="cloud"  className="zonals-cloud-one"/>
                </div>

            </div>
        );
    }
}
