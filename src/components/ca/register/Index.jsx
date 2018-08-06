import React from 'react';
import { Link } from 'react-router-dom';

import "./css/register.css";
import img from "./img/logo.png";
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';

// const options = [
//     { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
//     { value: 'Assam', label: 'Assam' },
//     { value: 'Bihar', label: 'Bihar' },
//     { value: 'Chhattisgarh', label: 'Chattisgarh' },
//     { value: 'Goa', label: 'Goa' },
//     { value: 'Gujarat', label: 'Gujarat' },
//     { value: 'Haryana', label: 'Haryana' },
//     { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
//     { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
//     { value: 'Jharkhand', label: 'Jharkhand' },
//     { value: 'Karnataka', label: 'Karnataka' },
//     { value: 'Kerala', label: 'Kerala' },
//     { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
//     { value: 'Maharashtra', label: 'Maharashtra' },
//     { value: 'Manipur', label: 'Manipur' },
//     { value: 'Meghalaya', label: 'Meghalaya' },
//     { value: 'Mizoram', label: 'Mizoram' },
//     { value: 'Nagaland', label: 'Nagaland' },
//     { value: 'Odisha', label: 'Odisha' },
//     { value: 'Punjab', label: 'Punjab' },
//     { value: 'Rajasthan', label: 'Rajasthan' },
//     { value: 'Sikkim', label: 'Sikkim' },
//     { value: 'Tamil Nadu', label: 'Tamil Nadu' },
//     { value: 'Telangana', label: 'Telangana' },
//     { value: 'Tripura', label: 'Tripura' },
//     { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
//     { value: 'Uttarakhand', label: 'Uttarakhand' },
//     { value: 'West Bengal', label: 'West Bengal' }
// ];

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
            errors: '',
            selectedOption: null
        }
        this.Auth = new AuthService()
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }
    componentWillMount() {
        if (this.props.userData) {
            if (this.props.userData.email) {
                this.setState({
                    name: this.props.userData.name,
                    email: this.props.userData.email,
                })
            } else {
                this.setState({
                    name: this.props.userData.name,
                })
            }
            if (!this.props.userData.fb_id) {
                this.props.history.push('/ca/')
            }
        } else {
            this.props.history.push('/ca/')
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'contact' && value) {
            value = value.trim()
            value = value.substring(0, 10)
        }
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
                    console.log(e)
                });
        } else if (check.errors !== {}) {
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
                            <Link to="/"><img src={img} alt="r-logo" /></Link>
                        </div>
                        <div className="vertical_line">
                        </div>
                        <div className="register-ca common-cursor">
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
                                        spellcheck="false"
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
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        value={email}
                                        onChange={this.onChange}
                                        spellcheck="false"
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
                                    <label htmlFor="inputState">College State</label>
                                    <select
                                        className="form-state-select"
                                        id="state"
                                        name="state"
                                        value={state}
                                        onChange={this.onChange}
                                        required
                                    >
                                        <option value="" disabled="true"> College State </option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Maharashtra">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </select>
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
