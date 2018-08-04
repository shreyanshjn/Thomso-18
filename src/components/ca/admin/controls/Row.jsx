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
                    if (r && r.data && r.data.success) {
                        this.setState({ isDisabled: false, blocked: !this.state.blocked })
                    } else {
                        this.setState({ isDisabled: false })
                    }
                })
                .catch(e => {
                    this.setState({ isDisabled: false })
                });
        }
    }

    render(){
        return (
            <React.Fragment>
                {this.props.data ? 
                    <tr>
                        <td style={{textAlign: 'center'}}>{this.props.data.ca_id ? this.props.data.ca_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.gender ? this.props.data.gender : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.likes ? this.props.data.likes : 0}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.shares ? this.props.data.shares : 0}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.score ? this.props.data.score : 0}</td>
                        <td style={{textAlign: 'center'}}>{(this.props.data.ideas && this.props.data.ideas.length) ? this.props.data.ideas.length : 'None'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.bonus ? this.props.data.bonus : 0}</td>
                        <td style={{textAlign: 'center'}}>Update Bonus</td>
                        <td style={{textAlign: 'center'}}>
                            <button onClick={this.switchBlock} disabled={this.state.isDisabled}>
                                {this.state.blocked ? 'Unblock' : 'Block' }
                            </button>
                        </td>
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
