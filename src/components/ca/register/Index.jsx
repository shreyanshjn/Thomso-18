import React from 'react';

import "./css/register.css";
import img from "./img/logo.png";
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';

export default class RegisterIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            contact: '',
            email: '',
            gender: '',
            college: '',
            state: '',
            branch: '',
            address: '',
            why: '',
            errors: ''
        }
        this.Auth = new AuthService()
    }

    componentWillMount() {
        if (this.props.userData) {
            this.setState({
                name: this.props.userData.name,
                email: this.props.userData.email,
                gender: this.props.userData.gender
            })
            if (!this.props.userData.fb_id) {
                this.props.history.push('/ca/')
            }
        } else {
            this.props.history.push('/ca/')
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, contact, email, gender, college, state, branch, address, why } = this.state;
        let data = { name, contact, email, gender, college, state, branch, address, why }
        const check = validateInput(email, 'email')
        if (name && contact && email && gender && college && state && branch && address && why && check.isValid) {
            const tempToken = this.Auth.getTempToken()
            FetchApi('POST', '/api/ca/auth/fbRegister', data, tempToken)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        this.Auth.setToken(r.data.token)
                        this.props.updateRoutes(true)
                        this.props.setUserData(r.data.body)
                        this.props.history.push('/ca/')
                    }
                })
                .catch(e => {
                    debugger
                    console.log(e)
                });
        } else if (check.errors) {
            this.setState({ errors: check.errors })
        } else {
            this.setState({ errors: 'Fields cannot be empty' })
        }
    }

    render() {
        const { name, contact, email, gender, college, state, branch, address, why, errors } = this.state;
        return (
            <div className="register-parent">
                <div className="register-child">
                    <div className="register-heading">
                        <div className="r-logo">
                            <img src={img} />
                        </div>
                        <div className="vertical_line">
                        </div>
                        <div className="register-ca">
                            <h1>Campus<br /> Ambassador</h1>
                        </div>
                    </div>
                    <div className="register-form">
                        <form onSubmit={this.onSubmit}>
                            {errors ?
                                <div>
                                    {errors}
                                </div>
                                : null
                            }
                            <div className="form-heading">
                                <h2>CA Registration form</h2>
                            </div>
                            <div className="form-first-child">
                                <div className="form-name">
                                    <label htmlFor="inputName">Name</label>
                                    <input
                                        id="inputName"
                                        type="text"
                                        placeholder="Your Name"
                                        name="name"
                                        value={name}
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-contactnumber">
                                    <label htmlFor="inputContact">Contact Number</label>
                                    <input
                                        id="inputContact"
                                        type="number"
                                        placeholder="Contact Number"
                                        name="contact"
                                        maxLength="10"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={contact}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-first-child">
                                <div className="form-email">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input
                                        id="inputEmail"
                                        type="email"
                                        placeholder="Your Email"
                                        name="email"
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        value={email}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-gender">
                                    <label htmlFor="inputGender">Gender</label>
                                    <select
                                        id="inputGender"
                                        name="gender"
                                        value={gender}
                                        onChange={this.onChange}
                                        required
                                    >
                                        <option value="" disabled="true"> Gender </option>
                                        <option value="male"> Male </option>
                                        <option value="female"> Female </option>
                                        <option value="other"> Other </option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-college-child">
                                <label htmlFor="inputCollege">College</label>
                                <input
                                    id="inputCollege"
                                    type="text"
                                    placeholder="College Name"
                                    name="college"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    value={college}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-first-child">
                                <div className="form-state">
                                    <label htmlFor="inputState">State</label>
                                    <input
                                        id="inputState"
                                        type="text"
                                        placeholder="State Name"
                                        name="state"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={state}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-branch">
                                    <label htmlFor="inputBranch">Branch</label>
                                    <input
                                        id="inputBranch"
                                        type="text"
                                        placeholder="Branch Name"
                                        name="branch"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        autoCapitalize="on"
                                        value={branch}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-add-child">
                                <label htmlFor="inputAddress">Address</label>
                                <input
                                    id="inputAddress"
                                    type="text"
                                    placeholder="Address Name"
                                    name="address"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    value={address}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-inwhy-child">
                                <label htmlFor="inputWhy">Why should we choose you?</label>
                                <textarea
                                    id="inputWhy"
                                    placeholder="Your Answer"
                                    name="why"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    autoCapitalize="on"
                                    rows="1"
                                    value={why}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="register">
                                <button type="submit">Register</button>
                            </div>

                        </form>
                    </div>
                </div >
            </div >
        );
    }
}
