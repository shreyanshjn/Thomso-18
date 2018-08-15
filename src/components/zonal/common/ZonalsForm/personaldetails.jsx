import React from 'react';
import '../../src/css/ZonalsForm.css';

export default class PersonalDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            contact: "",
            college: "",
            branch: "",
        }
    }
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    changeForm = (e) => {
        e.preventDefault()
        this.props.statevalues(this.state)
        this.props.function()
    }
    render() {
        return (
            <React.Fragment>
                <form className={this.props.var ? "register-zonals-form" : "register-zonals-form inactive"} onSubmit={this.changeForm}>
                    <div className="register-zonals-form-firstchild">
                        <input onChange={this.onChange} type="text" name="name" value={this.state.name} autoComplete="off" placeholder="Name" /><br />
                        <input onChange={this.onChange} type="email" name="email" value={this.state.email} autoComplete="off" placeholder="Email" /><br />
                        <input onChange={this.onChange} type="number" name="contact" value={this.state.contact} autoComplete="off" placeholder="Contact Number" /><br />
                        <input onChange={this.onChange} type="text" name="college" value={this.state.college} autoComplete="off" placeholder="College Name" /><br />
                        <input onChange={this.onChange} type="text" name="branch" value={this.state.branch} autoComplete="off" placeholder="Branch Name and year" /><br />
                    </div>
                    <div className="register-zonals-form-secondchild">
                        <button type="submit" >NEXT</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

