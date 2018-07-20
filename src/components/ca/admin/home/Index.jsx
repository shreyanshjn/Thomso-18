import React from 'react';

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            participants: []
        };
        this.Auth = new AuthService();
    }

    componentWillMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/admin/participants', null, authtoken)
            .then((result) => {
                console.log(result, 'Participant List')
                this.setState({ participants: result.data });
            })
            .catch(error => {
                if(error.response.status === 401) {
                    this.setState({ message: 'Token Expired' });
                    this.props.history.push('/ca/admin/logout')
                }
            });
    }

    render(){
        return (
            <div>
                Admin Home
            </div>
        )
    }
}
