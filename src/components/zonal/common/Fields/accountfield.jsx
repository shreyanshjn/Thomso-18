import React from 'react';

export default class AccountFields extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
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
            password: this.state.password
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
            <div>
                <form onSubmit={this.saveAndContinue}>
                    <label>Name</label>
                    <input type="text"
                        value={this.state.name}
                        name="name"
                        onChange={this.onChange} />
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange} />

                    <label>Email</label>
                    <input type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange} />

                    <button type='submit'>Save and Continue</button>
                </form>
            </div >
        );
    }
}
