import React, { Component } from 'react';

import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';

// import './style.css';

export default class RegisterIndex extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        const check = validateInput({email:username, password});
        if (check.isValid) {
            FetchApi('POST','/api/ca/auth/register', { username, password })
                .then((res) => {
                    console.log(res)
                    if (res && res.data) {
                        if (res.data.success) {
                            this.props.history.push("/ca/")
                        } else {
                            this.setState({error: res.data.msg})
                        }
                    }
                })
                .catch(error => {
                    this.setState({error: ''})
                    console.log(error, 'Register')
                });    
        } else {
            this.setState({error: check.errors})
        }
    }

    render() {
        const { username, password, error } = this.state;
        return (
            <div>
                {!(error.password || error.email) ?
                    error
                : 
                    <div>
                        {error.email ? error.email : null}
                        {error.password ? error.password : null}
                    </div>
                }
                <form onSubmit={this.onSubmit}>
                    <h2>Register</h2>
                    <label>Email address</label>
                    <input 
                        id="inputEmail" 
                        type="email" 
                        placeholder="Email address" 
                        name="username"
                        autoCorrect="off" 
                        autoCapitalize="off"  
                        value={username} 
                        onChange={this.onChange} 
                        required
                    />
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
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}
