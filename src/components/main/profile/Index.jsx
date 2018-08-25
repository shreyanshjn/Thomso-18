import React from "react";
import { Link } from "react-router-dom";
import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/main/AuthService';
import "../src/css/profile.css"
import dustbin from '../src/img/dustbin.png';

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

    onChange1 = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { event_id, event_name, isPrimary } = this.state;
        const data = { event_id, name: event_name, isPrimary }
        FetchApi('POST', '/api/main/addEvent', data)
            .then(res => {
                if (res && res.data) {
                    if (res.data.success) {
                        this.setState({ error: res.data.msg })
                    }
                    else {
                        this.setState({
                            disabled: false,
                            error: res.data.msg
                        })
                    }
                }
            })
            .catch(e => {
                this.setState({ error: e.response.msg })
            });
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
                <div className="participant-child-get-seized">
                    <p>GET SEIZED</p>
                </div>
                <div className="participant-profile-child-details">
                    <div className="participant-profile-child-left">
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Name :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.name) ? this.props.userData.name : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details" style={{display:"inline-block",width:"50%"}}>
                            <p className="participant-profile-label">Thomso ID :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.thomso_id) ? this.props.userData.thomso_id : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details" style={{display:"inline-block",width:"40%",marginLeft:"12px"}}>
                            <p className="participant-profile-label">Gender :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.gender) ? this.props.userData.gender : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details college">
                            <p className="participant-profile-label">College:</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.college) ? this.props.userData.college : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Address :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.address) ? this.props.userData.address : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Mobile :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.contact) ? this.props.userData.contact : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Email:</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.email) ? this.props.userData.email : null}</p>
                        </div>
                        <div className="participant-profile-child-left-details">
                            <p className="participant-profile-label">Primary event :</p><p className="participant-somedetails">{(this.props.userData && this.props.userData.primary_event && this.props.userData.primary_event.name) ? this.props.userData.primary_event.name: null}</p>
                        </div>
                    </div>
                      <div className="participant-profile-child-right">
                         <div className="participant-profile-events">
                            <div className="participant-profile-event-heading">
                                My Events
                            </div>
                            <div className="participant-profile-event-details">
                                    <table className="participant-profile-table-events">
                                        <tbody>
                                            {this.state.events ? this.state.events.map((data, i) => 
                                                <tr key={`events${i+1}`}>
                                                    <td className="table-child-one">
                                                        {i+1}. &nbsp; {data.event_id}{data.name}
                                                    </td>
                                                    <td className="table-child-two">
                                                        <img src={dustbin} alt="delete" className="main-events-bin"/>
                                                    </td>
                                                </tr>
                                            )
                                            : null}
                                        </tbody>
                                    </table>
                            </div>
                       </div>
                       <div className="main-events-add-more-parent">
                           <Link to="/events" className="main-events-add-more">Add More events</Link>
                       </div>
                 </div>
                </div>
                <div>
                    {error ? <div style={{ color: 'red', fontSize: '22px' }}>{error}</div> : null}

                    <br /><br /><br />

                    {/*  {(this.props.userData && this.props.userData.event && this.props.userData.event.length > 0) ?
                        <div>click to select event to deletes
                        <form onSubmit={this.onRemove}>
                                <button type="submit" disabled={disabled}>Delete Event</button>
                            </form>
                        </div>
                        : <div>no event to delete first so to event page and register for events</div>}
                    <h4> Add event here</h4>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <div>
                                <label htmlFor="inputID">Event id</label>
                                <input
                                    name="event_id"
                                    type="text"
                                    id="inputID"
                                    placeholder="event_id"
                                    value={event_id}
                                    onChange={this.onChange1}
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    autoComplete="off"
                                    spellCheck="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="inputName">Name</label>
                                <input
                                    id="inputName"
                                    type="text"
                                    name="event_name"
                                    onChange={this.onChange1}
                                    value={event_name}
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="inputPrimary">Primary</label>
                                <input
                                    id="inputPrimary"
                                    type="checkbox"
                                    onChange={() => this.setState({isPrimary: !this.state.isPrimary})}
                                    value={isPrimary}
                                />
                            </div>
                            <div>
                                <button type="submit">Add event</button>
                            </div>
                        </div>
                    </form>*/}
                </div >
            </div>
        );
    }
}
