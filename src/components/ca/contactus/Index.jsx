import React from 'react';
import "./css/contactus.css";

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
                        <div className="image_one">
                        </div>
                        <div className="details_one">
                            <div className="name">
                                <h2>JOHN DOE</h2>
                            </div>
                            <div className="post">
                                <h2>EVENT MANAGER</h2>
                            </div>
                        </div>
                    </div>
                    <div className="incontact_two">
                        <div className="image_one">
                        </div>
                        <div className="details_one">
                            <div className="name">
                                <h2>JOHN DOE</h2>
                            </div>
                            <div className="post">
                                <h2>EVENT MANAGER</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}