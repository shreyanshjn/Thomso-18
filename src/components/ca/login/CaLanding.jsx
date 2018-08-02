import React from 'react';
import logoca from './src/img/logo.png';
import "./src/css/calanding.css";
export default class CalandingNavbar extends React.Component {
    render() {
        return (
            <div>
                <div className={this.props.className}>
                    <div className="calanding-logo">
                        <img src={logoca} alt="calanding-logo" />
                    </div>
                    <div className="vertical_line">
                    </div>
                    <div className="ca-landing-ca">
                        <h2>Campus<br /> Ambassador</h2>
                    </div>
                </div>
            </div>
        );
    }
}
