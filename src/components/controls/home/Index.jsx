import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../handlers/controls/AuthService';
import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';

export default class HomeIndex extends Component {
    constructor() {
        super();
        this.state = {
           thomso_id:'',
            errors:'',
            userData:[], 
            disabled:false,
        };
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let { thomso_id } = this.state;
            const data = {thomso_id};
            if (data && data.thomso_id) {
                this.setState({ disabled: true })
                const isAuthenticated = this.Auth.hasToken();
                    if (isAuthenticated) {
                        const token = this.Auth.getToken()
                        console.log(data)
                        FetchApi('GET', '/api/controls/user_info', data, token)
                            .then(r => {
                                if (r && r.data && r.data.success && r.data.body) {
                                    this.setState({isAuthenticated:true, userData: r.data.body });
                                }
                            })
                        .catch(e => {
                            if (e.response && e.response.data) {
                                this.setState({ disabled: false, errors: e.response.data.msg })
                            } else {
                                this.setState({ disabled: false, errors: 'Something went wrong' })
                            }
                        });
                }
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
    }
    
    render() {
        const { errors, thomso_id,disabled } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                            {errors ?
                                <div style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                                    {errors}
                                </div>
                                : null
                            }
                            <div>
                                <h2>Thomso ID</h2>
                            </div>
                            <div >
                                <div>
                                    <input
                                        name="thomso_id"
                                        type="text"
                                        id="inputThomsoID"
                                        placeholder="Thomso ID"
                                        value={thomso_id}
                                        onChange={this.onChange}
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        autoComplete="off"
                                        spellCheck="off"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <button type="submit" disabled={disabled}>SUBMIT</button>
                            </div>
                        </form>

            </div>
        );
    }
}
