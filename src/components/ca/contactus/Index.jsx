import React from 'react';
import "./css/contactus.css";
import gmail from "../../beta/home/src/img/gmail.png";
import call from "../../beta/home/src/img/call.png"

export default class ContactIndex extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        return (
            <div className="contact-parent">
                <div className="incontact">
                    <div className="incontact_one">
                        <div className="child flex_column">
                            <div className="image_one">
                            </div>
                            <div className="details_one">
                                <div className="name">
                                    <h2>Harshit kanakariya</h2>
                                </div>
                                <div className="post">
                                    <h2>EVENTS AND MANAGEMENT</h2>
                                </div>
                                <div className="gmail">
                                    <img src={gmail} />
                                    <span>harshit.thomso@gmail.com</span>
                                </div>
                                <div className="call">
                                    <img src={call} />
                                    <span>+91-9340043505</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="incontact_two">
                        <div className="child flex_column">
                            <div className="image_two">
                            </div>
                            <div className="details_one">
                                <div className="name">
                                    <h2>Rohit Niranjan</h2>
                                </div>
                                <div className="post">
                                    <h2>EVENTS AND MANAGEMENT</h2>
                                </div>
                                <div className="gmail">
                                    <img src={gmail} />
                                    <span>Niranjan98.thomso@gmail.com</span>
                                </div>
                                <div className="call">
                                    <img src={call} />
                                    <span>+91-7023511775</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {console.log()}
                    {(this.props.userData && this.props.userData.gender !== "female") ?
                        <div className="incontact_three">
                            <div className="child flex_column">
                                <div className="image_three">
                                </div>
                                <div className="details_one">
                                    <div className="name">
                                        <h2>Nikhil Mehra</h2>
                                    </div>
                                    <div className="post">
                                        <h2>Technical Head</h2>
                                    </div>
                                    <div className="gmail">
                                        <img src={gmail} />
                                        <span>nikhil.thomso@gmail.com</span>
                                    </div>
                                    <div className="call">
                                        <img src={call} />
                                        <span>+91-9116891112</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="incontact_three">
                            <div className="child flex_column">
                                <div className="image_four">
                                </div>
                                <div className="details_one">
                                    <div className="name">
                                        <h2>Prashant Verma</h2>
                                    </div>
                                    <div className="post">
                                        <h2>Technical Head</h2>
                                    </div>
                                    <div className="gmail">
                                        <img src={gmail} />
                                        <span>prashant.thomso@gmail.com</span>
                                    </div>
                                    <div className="call">
                                        <img src={call} />
                                        <span>+91-8840592467</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}