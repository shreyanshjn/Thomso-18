import React from 'react';

import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import validateInput from '../../../utils/validation/loginValidation';

export default class RegisterIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            contact: '',
            email: '',
            gender: '',
            college : '',
            state : '',
            branch : '',
            address : '',
            why : '',
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
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
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
                .catch(e => console.log(e));
        } else if (check.errors) {
            this.setState({errors: check.errors})
        } else {
            this.setState({errors: 'Fields cannot be empty'})
        }
    }

    render(){
        const {name, contact, email, gender, college, state, branch, address, why, errors } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {errors ?
                        <div>
                            {errors}
                        </div>
                        : null
                    }
                    <h2>Register</h2>
                    <label htmlFor="inputName">Name</label>
                    <input 
                        id="inputName" 
                        type="text" 
                        placeholder="Your Name" 
                        name="name" 
                        value={name} 
                        onChange={this.onChange} 
                        required
                    />
                    <label htmlFor="inputContact">Contact Number</label>
                    <input 
                        id="inputContact" 
                        type="number" 
                        placeholder="Contact Number" 
                        name="contact" 
                        maxLength="10"
                        value={contact} 
                        onChange={this.onChange} 
                        required
                    />
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
                    <label htmlFor="inputCollege">College</label>
                    <input 
                        id="inputCollege" 
                        type="text" 
                        placeholder="College Name" 
                        name="college" 
                        value={college} 
                        onChange={this.onChange} 
                        required
                    />
                    <label htmlFor="inputState">State</label>
                    <input 
                        id="inputState" 
                        type="text" 
                        placeholder="State Name" 
                        name="state" 
                        value={state} 
                        onChange={this.onChange} 
                        required
                    />
                    <label htmlFor="inputBranch">Branch</label>
                    <input 
                        id="inputBranch" 
                        type="text" 
                        placeholder="Branch Name" 
                        name="branch" 
                        value={branch} 
                        onChange={this.onChange} 
                        required
                    />
                    <label htmlFor="inputAddress">Address</label>
                    <input 
                        id="inputAddress" 
                        type="text" 
                        placeholder="Address Name" 
                        name="address" 
                        value={address} 
                        onChange={this.onChange} 
                        required
                    />
                    <label htmlFor="inputWhy">Why should we choose you?</label>
                    <textarea 
                        id="inputWhy" 
                        placeholder="Your Answer" 
                        rows="5" 
                        name="why" 
                        value={why} 
                        onChange={this.onChange} 
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}
