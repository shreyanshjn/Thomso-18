import React, { Component } from 'react';
import carousel from "./carousel.js";
import "./carousel.css"
import LeftArrow from "./leftarrow"
import RightArrow from "./rightarrow"
import Farhan from "./src/svg/Farhan"
import Nucleya from "./src/svg/Nucleya"
import Shaan from "./src/svg/Shaan"
import Sonu from "./src/svg/Sonu"
import Sunidhi from "./src/svg/Sunidhi"

export default class Carousel extends Component {
    state = {}
    componentDidMount() {
        carousel();
    }
    render() {
        return (
            <div className="carousel-parent">
                <div className="leftarrow" style={{
                }}>
                    <LeftArrow />
                </div>
                <div className="card-carousel">
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "Its time for sex baby"
                            </p>
                            <Farhan />
                        </div>
                    </div>
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "Its time for sex baby"
                            </p>
                            <Sunidhi />

                        </div>
                    </div>
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "Its time for sex baby"
                            </p>
                            <Shaan />
                        </div>
                    </div>
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "Its time for sex baby"
                            </p>
                            <Nucleya />
                        </div>
                    </div>
                    <div className="my-card" >
                        <div className="my-card-child">
                            <p>
                                "Its time for sex baby"
                            </p>
                            <Sonu />
                        </div>
                    </div>
                </div>
                <div className="rightarrow" style={{
                }}>
                    <RightArrow />
                </div>
            </div>
        );
    }
}
