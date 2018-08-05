import React from 'react';

export default class Confirmation extends React.Component {
    render() {
        return (
            <div>
                <h4>Name:</h4>{this.props.fieldValues.name}
                <h4>Email:</h4>{this.props.fieldValues.email}
                <button onClick={this.props.previousStep}>Back</button>
                <button onClick={this.props.submitRegistration}>Submit Registration</button>
            </div>
        );
    }
}
