import React from "react";

import AuthService from '../../../handlers/main/AuthService';
import FetchApi from "../../../utils/FetchAPI";

import dustbin from '../src/img/dustbin.png';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            deleted: false
        }
        this.Auth = new AuthService();
    }

    onRemove = (e) => {
        e.preventDefault()
        const event_id = this.props.data.event_id;
        if (event_id && !this.state.disabled) {
            this.setState({disabled: true})
            const data = { event_id }
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/main/removeParticipant', data, token)
                .then(res => {
                    console.log(res.data)
                    if (res && res.data) {
                        this.setState({ deleted: true })
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    render() {
        return (
            <tr>
                <td className="table-child-one" style={this.state.deleted ? {textDecoration: 'line-through'} : null}>
                    {this.props.index + 1}. &nbsp; {this.props.data ? this.props.data.event_id : null} {this.props.data ? this.props.data.name : null}
                </td>
                <td className="table-child-two" onClick={this.onRemove} style={this.state.deleted ? {cursor: 'not-allowed'} : {cursor: 'pointer'} }>
                    <img src={dustbin} alt="delete" className="main-events-bin"/>
                </td>
            </tr>
        );
    }
}
