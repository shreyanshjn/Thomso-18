import React from 'react';
import { Link } from 'react-router-dom';
// import IntegrationReactSelect from './select_react';
import "./css/register.css";
import img from "./img/logo.png";
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';

// const options = [
//     { label: 'Afghanistan' },
//     { label: 'Aland Islands' },
//     { label: 'Albania' },
//     { label: 'Algeria' },
//     { label: 'American Samoa' },
//     { label: 'Andorra' },
//     { label: 'Angola' },
//     { label: 'Anguilla' },
//     { label: 'Antarctica' },
//     { label: 'Antigua and Barbuda' },
//     { label: 'Argentina' },
//     { label: 'Armenia' },
//     { label: 'Aruba' },
//     { label: 'Australia' },
//     { label: 'Austria' },
//     { label: 'Azerbaijan' },
//     { label: 'Bahamas' },
//     { label: 'Bahrain' },
//     { label: 'Bangladesh' },
//     { label: 'Barbados' },
//     { label: 'Belarus' },
//     { label: 'Belgium' },
//     { label: 'Belize' },
//     { label: 'Benin' },
//     { label: 'Bermuda' },
//     { label: 'Bhutan' },
//     { label: 'Bolivia, Plurinational State of' },
//     { label: 'Bonaire, Sint Eustatius and Saba' },
//     { label: 'Bosnia and Herzegovina' },
//     { label: 'Botswana' },
//     { label: 'Bouvet Island' },
//     { label: 'Brazil' },
//     { label: 'British Indian Ocean Territory' },
//     { label: 'Brunei Darussalam' },
// ].map(suggestion => ({
//     value: suggestion.label,
//     label: suggestion.label,
// }));

export default class RegisterIndex extends React.Component {
    constructor() {
        super();
        this.state = {
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
        let { name, contact, email, gender, college, state, branch, address, why } = this.state;
        if (name) {
            name = name.trim()
        }
        if (contact) {
            contact = contact.trim()
        }
        if (college) {
            college = college.trim()
        }
        if (branch) {
            branch = branch.trim()
        }
        if (address) {
            address = address.trim()
        }
        if (why) {
            why = why.trim()
        }
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
                    if (e.response && e.response.status === 400 && e.response.data && e.response.data.emailerr) {
                        this.setState({ errors: 'Email Already Exists' })
                    }
                    console.log(e)
                });
        } else if (check.errors && check.errors.email) {
            this.setState({ errors: check.errors.email })
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
                                <div style={{textAlign: 'center',  color: 'red', fontWeight: '600'}}>
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
                                        spellCheck="false"
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
                                        spellCheck="false"
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
                            {/* <div className="form-college-child">
                                <label htmlFor="inputCollege">College</label>
                                <IntegrationReactSelect options={options} />
                            </div> */}
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
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Puducherry">Puducherry</option>
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
                                    <label htmlFor="inputBranch">Branch and Year</label>
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
