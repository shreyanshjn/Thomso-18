import React from 'react';
import AccountFields from './Fields/accountfield'
import Confirmation from './Fields/confirmation'
import Success from './Fields/success'
import './zonals.css'

export default class ZonalsForm extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            name: '',
            email: '',
            collegename: '',
            contactnumber: '',
            branch_and_year: ''
        };
    }

    saveValues = fields => {
        this.setState(fields)
    }

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    previousStep = () => {
        this.setState({
            step: this.state.step - 1
        })
    }
    submitRegistration = () => {
        this.nextStep()
    }
    render() {
        switch (this.state.step) {
            case 1:
                return <AccountFields fieldValues={this.state}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues} />
            case 2:
                return <Confirmation fieldValues={this.state}
                    previousStep={this.previousStep}
                    submitRegistration={this.submitRegistration} />
            case 3:
                return <Success fieldValues={this.state} />
            default:
                return <div>Error</div>
        }
    }
}