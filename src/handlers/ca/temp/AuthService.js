import React from 'react';

export default class AuthService extends React.Component{

    hasToken() {
        const token = this.getToken();
        return !!token
    }

    setTemp() {
        localStorage.setItem('temp_ca_require_verification', 1)
    }

    isTemp() {
        const isTemp = localStorage.getItem('temp_ca_require_verification')
        return !!isTemp
    }

    setVertfied() {
        if (this.isTemp()) {
            localStorage.removeItem('temp_ca_require_verification')
        }
    }

    getToken() {
        return localStorage.getItem('temp_ca_auth_token')
    }

    logout() {
        if (this.getToken()) {
            localStorage.removeItem('temp_ca_auth_token')
        }
    }

    setToken(token) {
        localStorage.setItem('temp_ca_auth_token', token)
    }
}
