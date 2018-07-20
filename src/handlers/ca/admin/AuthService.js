import React from 'react';

export default class AuthService extends React.Component{

    hasToken() {
        const token = this.getToken();
        return !!token;
    }

    getToken() {
        return localStorage.getItem('ca_admin_auth_token')
    }

    logout() {
        const authToken = this.getToken()
        const name = localStorage.getItem('ca_admin_name')
        if (authToken) {
            localStorage.removeItem('ca_admin_auth_token')
        }
        if (name) {
            localStorage.removeItem('ca_admin_name')
        }
    }

    setData(data) {
        if (data.token) {
            localStorage.setItem('ca_admin_auth_token', data.token)
        }
        if (data.username) {
            localStorage.setItem('ca_admin_name', data.username)
        }
    }
}
