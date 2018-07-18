import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../handlers/ca/AuthService';
import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';

// import './style.css';

export default class LoginIndex extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: ''
        };
        this.Auth = new AuthService();
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
            FetchApi('POST','/api/ca/auth/login', { username, password })
                .then((result) => {
                    this.Auth.setToken(result.data.token)
                    this.setState({ message: '' });
                    this.props.updateRoutes(true)
                    this.props.history.push('/ca/')
                })
                .catch(error => {
                    if(error.response.status === 401) {
                        this.setState({ message: 'Login failed. Username or password not match' });
                    }
                });
        } else {
            this.setState({message: check.errors})
        }
    }

    render() {
        const { username, password, message } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {(message && !(message.password || message.email)) ?
                        <div>
                            {message}
                        </div>
                    : 
                        <div>
                            {message.email ? message.email : null}
                            {message.password ? message.password : null}
                        </div>
                    }
                    <h2>Please sign in</h2>
                    <label htmlFor="inputEmail">Email address</label>
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
                    <button type="submit">Login</button>
                    <p>
                        Not a member? <Link to="/ca/register">Register here</Link>
                    </p>
                </form>
            </div>
        );
    }
}
