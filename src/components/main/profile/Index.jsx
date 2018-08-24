import React from "react";
import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/main/AuthService';
import "../src/css/profile.css"

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event_id: '',
            event_name: '',
            error: '',
            isPrimary: false,
            disabled: true,
            events: []
        }
        this.Auth = new AuthService();
    }

    componentDidMount() {
        const isAuthenticated = this.Auth.hasToken();
        console.log(isAuthenticated, "isAuthenticated");
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('GET', '/api/main/events', null, token)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        this.setState({ events: r.data.body })
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    onChange = (e) => {
        let value = e.target.value;
        this.setState({ event_id: value, disabled: false });
    }

    onRemove = (e) => {
        e.preventDefault()
        let { event_id } = this.state;
        event_id = JSON.stringify(event_id)
        const data = { event_id }
        const token = this.Auth.getToken()
        FetchApi('POST', '/api/main/removeParticipant', data, token)
            .then(res => {
                // console.log(res.data)
                if (res && res.data) {
                    this.setState({ error: res.data.msg, disabled: true })
                }
            })
            .catch(e => {
                this.setState({ error: 'something' })
            })
    }


    render() {
        const { error, event_id, event_name, isPrimary,  disabled } = this.state;
        return (
            <div className="participant-profile-parent">
                <div className="participant-profile-child-details">
                    <div className="participant-profile-child-left">
                        <div className="participant-profile-child-left-details">
                            <span className="participant-profile-label">Name :</span><span className="participant-somedetails">{(this.props.userData && this.props.userData.name) ? this.props.userData.name : null}</span>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <span className="participant-profile-label">Thomso ID :</span><span className="participant-somedetails-some">{(this.props.userData && this.props.userData.thomso_id) ? this.props.userData.thomso_id : null}</span>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <span className="participant-profile-label">Gender :</span><span className="participant-somedetails">{(this.props.userData && this.props.userData.gender) ? this.props.userData.gender : null}</span>
                        </div>
                        <div className="participant-profile-child-left-details college">
                            <span className="participant-profile-label">College:</span><span className="participant-somedetails">{(this.props.userData && this.props.userData.college) ? this.props.userData.college : null}</span>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <span className="participant-profile-label">Address :</span><span className="participant-somedetails">{(this.props.userData && this.props.userData.address) ? this.props.userData.address : null}</span>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <span className="participant-profile-label">Mobile :</span><span>{(this.props.userData && this.props.userData.contact) ? this.props.userData.contact : null}</span>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <span className="participant-profile-label">Email:</span><span>{(this.props.userData && this.props.userData.email) ? this.props.userData.email : null}</span>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <span className="participant-profile-label">Primary event :</span>{(this.props.userData && this.props.userData.primary_event && this.props.userData.primary_event.name) ? this.props.userData.primary_event.name: null}<span></span>
                        </div>
                    </div>
                    <div className="participant-profile-child-right">
                        <div className="participant-profile-events">
                            <div className="participant-profile-event-heading">
                                Your Events
                            </div>
                            <div className="participant-profile-event-details">
                                {this.state.events ? this.state.events.map((data, i) => {
                                    return <li>{data.event_id}{data.name} </li>
                                })
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
