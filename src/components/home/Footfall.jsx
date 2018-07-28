import React, { Component } from 'react';
import './src/css/Footfall.css';
import diagram from './src/img/diagram-01.png';
class Footfall extends Component {
    render() {
        return (
            <div className="footfall"> 
                <div className="box">
                    <img src={diagram} className="aboveImage" alt="---------" />
                    <span className="first">150+</span><br/>
                    <span className="second">EVENTS</span>
                    <img src={diagram} className="downImage hide" alt="---------" />
                </div> 
                <div className="box">
                    <img src={diagram} className="aboveImage" alt="---------" />
                    <span className="first">800+</span> <br/>
                    <span lassName="second">COLLEGES</span>
                    <img src={diagram} className="downImage hide" alt="---------" />
                </div> 
                <div className="box">
                    <img src={diagram} className="aboveImage" alt="---------" />
                    <span className="first">100K+</span><br/>
                    <span className="second">FOOTFALLS</span>
                    <img src={diagram} className="downImage" alt="---------" />
                </div> 
            </div>
        );
    }
}

export default Footfall;
