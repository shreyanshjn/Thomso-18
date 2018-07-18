import React, { Component } from 'react';

import FetchApi from '../../../utils/FetchAPI';

// import './style.css';

export default class RegisterIndex extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
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

        FetchApi('POST','/api/ca/auth/register', { username, password })
            .then(() => {
                this.props.history.push("/ca/")
            })
            .catch(error => {
                console.log(error, 'Register')
            });
    }

    render() {
        const { username, password } = this.state;
        return (
            <div>
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
