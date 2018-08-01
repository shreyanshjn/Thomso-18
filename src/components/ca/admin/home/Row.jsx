import React from 'react';
import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

export default class Row extends React.Component {
    constructor() {
        super();
        this.state = {
            blocked: false,
            isDisabled: false
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        if (this.props.data && this.props.data.blocked !== undefined) {
            this.setState({blocked: this.props.data.blocked})
        }
    }

    switchBlock = index => {
        if (this.props.data && this.props.data._id) {
            const authtoken = this.Auth.getToken();
            this.setState({isDisabled: true})
            FetchApi('PUT', `/api/ca/admin/block/${this.props.data._id}`, {blocked: !this.state.blocked}, authtoken)
                .then(r => {
                    console.log(r)
                    if (r && r.data && r.data.success) {
                        this.setState({ isDisabled: false, blocked: !this.state.blocked })
                    } else {
                        this.setState({ isDisabled: false })
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.setState({ isDisabled: false })
                });
        }
    }

    render(){
        return (
            <tr>
                <td>{this.props.data ? this.props.data.name : '--'}</td>
                <td>{this.props.data ? this.props.data.college : '--'}</td>
                <td>{this.props.data ? this.props.data.email : '--'}</td>
                <td>{this.props.data ? this.props.data.branch : '--'}</td>
                <td>
                    <button onClick={this.switchBlock} disabled={this.state.isDisabled}>
                    {this.state.blocked ? 'Unblock' : 'Block' }
                    </button>
                </td>
                <td>{this.props.data ? this.props.data.fb_id : '--'}</td>
                <td>{this.props.data ? this.props.data.gender : '--'}</td>
            </tr>
        )
    }
}
