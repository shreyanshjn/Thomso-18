import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from "../../handlers/main/AuthService";
import FetchApi from "../../utils/FetchAPI";
import './src/css/EventsModals.css';

export default class EventDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            wait: false,
            isAuthenticated: false
        };
        this.registerEvent = this.registerEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.Auth = new AuthService();
    }
    registerEvent(eventId, id) {
        this.setState({ wait: true, disabled: true });
    }
    handleChange(id) {
        const filteredData = this.props.subevents.filter(s => s.id === id);
        this.setState({ data: filteredData[0] });
    }
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        console.log(isAuthenticated, 'isAuthenticated')
        if (this.props.detail && this.props.detail.subevents) {
            const filteredData = this.props.detail.subevents.filter(e => e.id === this.props.id);
            if (filteredData) {
                this.setState({ data: filteredData[0], isAuthenticated });
            } else {
                this.setState({ isAuthenticated })
            }
        } else if (isAuthenticated) {
            this.setState({ isAuthenticated })
        }
    }
    componentWillReceiveProps(nextProps) {
        const filteredData = nextProps.detail.subevents.filter(e => e.id === nextProps.id);
        this.setState({ data: filteredData[0] });
    }
    addEvent() {
        let event_id = this.props.id
        if (event_id) {
            const data = { event_id }
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/main/addParticipant', data, token)
                .then(r => {
                    if (r && r.data && r.data.success) {
                        this.props.history.push('/main')
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }
    render() {
        return (
            <div className="events-details-images-main-div">
                <div className="events-details-images-main-div-child">
                    <p>{this.state.data && this.state.data.name}</p>
                </div>
                <div className="events-dropdown">
                    <select className="events-dropdown-select" onChange={(e) => this.handleChange(e.target.value)}>
                        {(this.props.subevents && this.props.subevents.length) ? this.props.subevents.map(s =>
                            <option value={s.id} key={s.id} style={{ color: "#000000" }}>{s.name}</option>
                        ) : null}
                    </select>
                </div>
                {this.state.data ?
                    <div className="events-details-parent">
                        <div className="events-details-image">
                            <img alt="thomso-events-images" src={`/img/main/events/events/${this.state.data.image}`} style={{ maxHeight: "240px" }} />
                            <div className="events-price_money">
                                <span>Prizes Worth :</span> <span> 40K</span>
                            </div>
                        </div>
                        <div className="events-text-scroll-cont">
                            <p className="events-text-child">{this.state.data.content}</p>
                        </div>
                    </div> : null}
                {this.state.data && this.props.eventsId !== 9 ?
                    <div className="events-addevents">
                        {this.state.isAuthenticated ? <div className="be-events-modal-button" onClick={this.addEvent}>Add Event</div> :
                            <Link className="be-events-modal-button" to="/main">Login/Register</Link>
                        }
                        {this.state.data && this.state.data.rulebook ?
                            <a href={`/pdf/events/${this.state.data.rulebook}`} className="be-events-modal-button" target="_blank">Rulebook</a>
                            : null
                        }
                    </div>
                    : null}
                {this.state.data && this.props.eventsId === 9 ? <div className="events-registration">Registrations for this event will me made on the spot</div> : null}
            </div>
        )
    }
}

