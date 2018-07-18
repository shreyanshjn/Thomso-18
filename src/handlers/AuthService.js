import React from 'react';

export default class AuthService extends React.Component{

    hasToken() {
        const token = this.getToken();
        return !!token;
    }

    getToken() {
        return localStorage.getItem('authToken')
    }

    logout() {
        const authToken = this.getToken()
        const user_id = localStorage.getItem('user_id')
        const name = localStorage.getItem('name')
        if (authToken) {
            localStorage.removeItem('authToken')
            if (user_id) {
                localStorage.removeItem('user_id')
            }
            if (name) {
                localStorage.removeItem('name')
            }
        }
    }
}