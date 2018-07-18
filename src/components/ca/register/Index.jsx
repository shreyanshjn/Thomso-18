import React, { Component } from 'react';

import FetchApi from '../../../utils/FetchAPI';

import './style.css';

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

        FetchApi('POST','/api/auth/register', { username, password })
            .then((result) => {
                console.log(result)
                this.props.history.push("/login")
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h2>Register</h2>
                    <label htmlFor="inputEmail">Email address</label>
                    <input id="inputEmail" type="email" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
                    <label htmlFor="inputPassword" class="sr-only">Password</label>
                    <input id="inputPassword" type="password" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Create;