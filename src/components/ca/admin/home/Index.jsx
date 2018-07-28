import React from 'react';

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            participants: [],
            message: ''
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/admin/participants', null, authtoken)
            .then((result) => {
                console.log(result, 'Participant List')
                this.setState({ participants: result.data });
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    this.setState({ message: 'Token Expired' });
                    this.props.history.push('/ca/admin/logout');
                } else {
                    this.setState({ message: 'Unable to connect to the server' });
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
