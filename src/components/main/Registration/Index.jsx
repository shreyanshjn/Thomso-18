import React from "react";
import {Link} from "react-router-dom";
import FetchApi from "../../../utils/FetchAPI";
import CollegeSelect from "../../campusAmbassador/register/CollegeSelect";
import StateSelect from "../../campusAmbassador/register/StateSelect";
import validateInput from '../../../utils/validation/loginValidation';

export default class RegisterIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            contact: '',
            email: '',
            gender: '',
            college: '',
            state: '',
            branch: '',
            address: '',
            errors: '',
            referred_by:'',
            password:'',
            confirmPassword:'',
            selectedOption: null
        }
    }

    onChange = (e)=>{
        const name = e.target.name;
        let value = e.target.value;
        if(name === 'contact' && value){
            value = value.trim();
            value = value.substring(0,12)
        }
        this.setState({ [name]: value});
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    render(){
        const {name, contact, email, gender, branch, address, errors, referred_by, password, confirmPassword} = this.state;
        return(
            <div>
                <h1>Register Here...</h1>
                <form onSubmit={this.onSubmit}>
                    {errors ? 
                    <div style={{ color:'red', fontSize:'22px', fontWeight:'600'}}>
                        {errors}
                    </div>
                    : 
                    null
                    }

                    <div>
                        <div>
                            <label htmlFor="inputName"> Name </label>
                            <input
                                id="inputName"
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                value={name}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                onChange={this.onChange}
                                spellCheck="false"
                                required
                                 />
                        </div>
                    </div>
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
                        <label htmlFor="inputCollege">College</label>
                        <CollegeSelect onChange={college => this.setState({ college })} />
                    </div>
                    <div>
                        <label htmlFor="inputState">College State</label>
                        <StateSelect onChange={state => this.setState({ state })} />
                    </div>
                    <div>
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
                    <div>
                        <label htmlFor="inputAddress">Present College Address</label>
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
                    <div>
                        <label htmlFor="inputRefferedBy">Referral</label>
                        <input
                            id="inputRefferedBy"
                            type="text"
                            placeholder="Referral CA ID"
                            name="text"
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="off"
                            value={referred_by}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputPassword">Password</label>
                        <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            name="password"
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="off"
                            value={password}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="inputCPassword">Confrim Password</label>
                        <input
                            id="inputCPassword"
                            type="password"
                            placeholder="Confrim Password"
                            name="confirmPassword"
                            autoCorrect="off"
                            autoComplete="off"
                            autoCapitalize="off"
                            value={confirmPassword}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }

}
