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
        if (authToken) {
            localStorage.removeItem('ca_auth_token')
        }
    }

    setToken(token) {
        localStorage.setItem('ca_auth_token', token);
    }

    setTempToken(token) {
        localStorage.setItem('ca_temp_auth_token', token);
    }

    removeTempToken() {
        const tempToken = this.getTempToken()
        if (tempToken) {
            localStorage.removeItem('ca_temp_auth_token')
        }
    }

    getTempToken() {
        return localStorage.getItem('ca_temp_auth_token');
    }
}
