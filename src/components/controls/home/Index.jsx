import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../handlers/controls/AuthService';
import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';

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

    
    render() {
        const { username, password, message } = this.state;
        return (
            <div>
                skjfd

                <Link to="/controls/register">Register</Link>
            </div>
        );
    }
}
