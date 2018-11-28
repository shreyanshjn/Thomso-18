import React, { Component } from "react";
import FetchApi from "../../../utils/FetchAPI";
import AuthService from "../../../handlers/main/AuthService";


export default class CertificateIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            errors: "",
            msg: "",
            userdata: []
        }
        this.Auth = new AuthService();
    }
    handleSubmit = () => {
        let { username } = this.state
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken()

            if (username) username = username.trim()
            let data = {
                username: username
            }
            FetchApi('POST', '/api/main/ticktok_username', data, token)
                .then(r => {
                    console.log(r.data)
                    if (r && r.data) {
                        this.setState({ msg: "Usename submitted successfully" })
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.setState({ errors: "Something went wrong.Please try again" })
                });
        }
    }
    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('GET', '/api/main/fetch_certificate', null, token)
                .then(r => {
                    console.log(r.data)
                    if (r && r.data && r.data.body) {
                        this.setState({ userdata: r.data.body })
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.setState({ errors: "Something went wrong" })
                });
        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value, errors: "", msg: "" });
    }
    render() {
        return (
            <div>
                {this.state.errors ? <span>{this.state.errors}</span> : null}
                {this.state.msg ? <span>{this.state.msg}</span> : null}

                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="ticktok_id"
                        value={this.state.username}
                        onChange={this.handleChange}
                        placeholder="Enter your TickTok Username"
                        required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

