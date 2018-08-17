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
            <div className="campusAmb-contact-parent">
                <div className="campusAmb-contact-child">
                    <div className="campusAmb-contact-child-first">
                        <div className="campusAmb-contact-child-wrapper flex_column">
                            <div className="campusAmb-contact-image_one">
                            </div>
                            <div className="campusAmb-contact-details">
                                <div className="campusAmb-contact-details-name">
                                    <h2>Harshit kanakariya</h2>
                                </div>
                                <div className="campusAmb-contact-details-post">
                                    <h2>PUBLIC RELATIONS</h2>
                                </div>
                                <div className="campusAmb-contact-details-gmail">
                                    <img src={gmail} alt="email"/>
                                    <span>harshit.thomso@gmail.com</span>
                                </div>
                                <div className="campusAmb-contact-details-call">
                                    <img src={call} alt="mobile"/>
                                    <span>+91-9340043505</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="campusAmb-contact-child-second">
                        <div className="campusAmb-contact-child-wrapper flex_column">
                            <div className="campusAmb-contact-image_two">
                            </div>
                            <div className="campusAmb-contact-details">
                                <div className="campusAmb-contact-details-name">
                                    <h2>Rohit Niranjan</h2>
                                </div>
                                <div className="campusAmb-contact-details-post">
                                    <h2>PUBLIC RELATIONS</h2>
                                </div>
                                <div className="campusAmb-contact-details-gmail">
                                    <img src={gmail} alt="email"/>
                                    <span>niranjan98.thomso@gmail.com</span>
                                </div>
                                <div className="campusAmb-contact-details-call">
                                    <img src={call} alt="mobile"/>
                                    <span>+91-7023511775</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(this.props.userData && this.props.userData.gender === "female") ?
                        <div className="campusAmb-contact-child-third">
                            <div className="campusAmb-contact-child-wrapper flex_column">
                                <div className="campusAmb-contact-image_three">
                                </div>
                                <div className="campusAmb-contact-details">
                                    <div className="campusAmb-contact-details-name">
                                        <h2>Nikhil Mehra</h2>
                                    </div>
                                    <div className="campusAmb-contact-details-post">
                                        <h2>TECHNICAL HEAD</h2>
                                    </div>
                                    <div className="campusAmb-contact-details-gmail">
                                        <img src={gmail} alt="email"/>
                                        <span>nikhil.thomso@gmail.com</span>
                                    </div>
                                    <div className="campusAmb-contact-details-call">
                                        <img src={call} alt="mobile"/>
                                        <span>+91-9116891112</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="campusAmb-contact-child-fourth">
                            <div className="campusAmb-contact-child-wrapper flex_column">
                                <div className="campusAmb-contact-image_four">
                                </div>
                                <div className="campusAmb-contact-details">
                                    <div className="campusAmb-contact-details-name">
                                        <h2>Prashant Verma</h2>
                                    </div>
                                    <div className="campusAmb-contact-details-post">
                                        <h2>TECHNICAL HEAD</h2>
                                    </div>
                                    <div className="campusAmb-contact-details-gmail">
                                        <img src={gmail} alt="email"/>
                                        <span>prashant.thomso@gmail.com</span>
                                    </div>
                                    <div className="campusAmb-contact-details-call">
                                        <img src={call} alt="mobile"/>
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
