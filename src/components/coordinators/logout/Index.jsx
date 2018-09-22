import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../../handlers/coordinators/AuthService';
export default class LogoutIndex extends React.Component{
    constructor() {
        super()
        this.Auth = new AuthService()
    }
    componentWillMount() {
        this.Auth.logout();
    }
    render(){
        return (<Redirect to="/coordinator" />)
    }
}
