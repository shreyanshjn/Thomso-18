import React from 'react';

export default class AccountFields extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            collegename: '',
            contactnumber: '',
            branch_and_year: ''
        }
    }
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    saveAndContinue = e => {
        e.preventDefault()
        var data = {
            name: this.state.name,
            email: this.state.email,
            collegename: this.state.collegename,
            contactnumber: this.state.contactnumber,
            branch_and_year: this.state.branch_and_year
        }
        this.props.saveValues(data)
        this.props.nextStep()
    }
    componentDidMount() {
        if (this.props.fieldValues && typeof (this.props.fieldValues) === "object") {
            this.setState(this.props.fieldValues);
        }
    }
    render() {
        return (
            <div className="zonals-delhi-form-div">
                <form onSubmit={this.saveAndContinue}>
                    <div className="zonals-delhi-form-fields">
                        <input type="text"
                            value={this.state.name}
                            name="name"
                            onChange={this.onChange}
                            placeholder="Your Name"
                            required />
                        <input type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            placeholder="Your Email ID"
                            required />
                        <input type="number"
                            name="contactnumber"
                            value={this.state.contactnumber}
                            onChange={this.onChange}
                            placeholder="Contact Number"
                            maxLength="10"
                            required />
                        <input type="text"
                            value={this.state.collegename}
                            name="collegename"
                            onChange={this.onChange}
                            placeholder="Your College Name"
                            required />
                        <input type="text"
                            name="branch_and_year"
                            value={this.state.branch_and_year}
                            onChange={this.onChange}
                            placeholder="Your Branch and Year"
                            required />
                    </div>
                    <div className="zonals-delhi-form-button">
                        <button type='submit'>NEXT</button>
                    </div>
                </form>
            </div >
        );
    }
}
