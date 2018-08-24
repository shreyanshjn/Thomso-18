import React from 'react';
import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";
import DataTable from './DataTable';

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            
        };
        this.Auth = new AuthService();
    }

    onChange1 = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const isAuthenticated = this.Auth.hasToken();
        let { event_id, event_name, isPrimary } = this.state;
        const data = { event_id, name: event_name, isPrimary }
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/main/addEvent', data, token)
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
    }

    render(){
        let { error, event_id, event_name, isPrimary,  disabled } = this.state;
        return (
            <div>
                    {error ? <div style={{ color: 'red', fontSize: '22px' }}>{error}</div> : null}

                    <br /><br /><br />

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
                    </form>
                </div >
        )
    }
}
