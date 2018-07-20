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

    setData(data) {
        if (data.token) {
            localStorage.setItem('ca_auth_token', data.token);
        }
        if (data.name) {
            localStorage.setItem('ca_name', data.name);
        }
        if (data.user_id) {
            localStorage.setItem('ca_user_id', data.user_id);
        }
    }

    setTempToken(token) {
        if (this.getTempToken()) {

        }
        localStorage.setItem('ca_temp_auth_token', token);
    }

    removeTempToken() {
        if (localStorage.getItem('ca_temp_auth_token')) {
            localStorage.removeItem('ca_temp_auth_token')
        }
    }

    getTempToken() {
        return localStorage.getItem('ca_temp_auth_token');
    }
}
