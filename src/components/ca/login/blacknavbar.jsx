import React from 'react';
import logoca from '../../beta/home/src/img/logo3.png';
import "./src/css/RegisterNavbar.css";
export default class BlackNavbar extends React.Component {
    render() {
        return (
            <div>
                <div className="register-heading">
                    <div className="black-logo">
                        <img src={logoca} alt="r-logo" />
                    </div>
                    <div className="black-line">
                    </div>
                    <div className="black-text">
                        <h1>Campus<br /> Ambassador</h1>
                    </div>
                </div>
            </div>
        );
    }
}