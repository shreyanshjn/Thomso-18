import React from 'react';
import logoca from './src/img/logo.png';
import background from './src/img/background.png';
import "./src/css/RegisterNavbar.css";
export default class RegisterNavbar extends React.Component {
    render() {
        return (
            <div>
                <div className="register-heading">
                    <div className="r-logo">
                        <img src={logoca} alt="r-logo" />
                    </div>
                    <div className="vertical_line">
                    </div>
                    <div className="register-ca">
                        <h1>Campus<br /> Ambassador</h1>
                    </div>
                </div>
            </div>
        );
    }
}
