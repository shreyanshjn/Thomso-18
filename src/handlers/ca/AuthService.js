import React from 'react';

export default class AuthService extends React.Component{

    hasToken() {
        const token = this.getToken();
        return !!token;
    }

    getToken() {
        return localStorage.getItem('ca_auth_token')
    }

    logout() {
        const authToken = this.getToken()
        const user_id = localStorage.getItem('ca_user_id')
        const name = localStorage.getItem('ca_name')
        if (authToken) {
            localStorage.removeItem('ca_auth_token')
            if (user_id) {
                localStorage.removeItem('ca_user_id')
            }
            if (name) {
                localStorage.removeItem('ca_name')
            }
        }
    }

    setToken(token) {
        localStorage.setItem('ca_auth_token', token);
    }
}
