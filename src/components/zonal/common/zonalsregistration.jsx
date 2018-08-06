import React from 'react';
import ZonalsForm from './zonalsform';
import './zonals.css'

export default class ZonalsRegister extends React.Component {

    render() {
        return (
            <div className="zonals-delhi-parent">
                <div className="zonals-delhi-child">
                    <div className="zonals-delhi-logo">
                    </div>
                    <ZonalsForm />
                </div>
            </div>
        );
    }
}