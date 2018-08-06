import React from 'react';

export default class Confirmation extends React.Component {
    render() {
        return (
            <div className="zonals-delhi-confirmation">
                <div className="zonals-delhi-confirmation-details">
                    <div className="zonals-delhi-confirmation-details-heading">
                        <h3>CONFIRM DETAILS</h3>
                    </div>
                    <div className="zonals-delhi-confirmation-details-child">
                        <span className="zonals-delhi-details-tr">Name:</span><span className="zonals-delhi-details-td">{this.props.fieldValues.name}</span>
                    </div>
                    <div className="zonals-delhi-confirmation-details-child">
                        <span className="zonals-delhi-details-tr">Email:</span><span className="zonals-delhi-details-td">{this.props.fieldValues.email}</span>
                    </div>
                    <div className="zonals-delhi-confirmation-details-child">
                        <span className="zonals-delhi-details-tr">Contact Number:</span><span className="zonals-delhi-details-td">{this.props.fieldValues.contactnumber}</span>
                    </div>
                    <div className="zonals-delhi-confirmation-details-child">
                        <span className="zonals-delhi-details-tr">College Name:</span><span className="zonals-delhi-details-td">{this.props.fieldValues.collegename}</span>
                    </div>
                    <div className="zonals-delhi-confirmation-details-child">
                        <span className="zonals-delhi-details-tr">Branch Year:</span><span className="zonals-delhi-details-td">{this.props.fieldValues.branch_and_year}</span>
                    </div>
                </div>
                <div className="zonals-delhi-confirmation-button">
                    <button onClick={this.props.previousStep}>BACK</button>
                    <button onClick={this.props.submitRegistration}>SUBMIT</button>
                </div>
            </div >
        );
    }
}
