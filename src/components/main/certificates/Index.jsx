import React, { Component } from "react";
import FetchApi from "../../../utils/FetchAPI";
import AuthService from "../../../handlers/main/AuthService";
import "./certificate.css";

export default class CertificateIndex extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            errors: "",
            msg: "",
            userdata: [],
            showform:true
        }
        this.Auth = new AuthService();
    }
    usernameSubmit = (e) => {
        e.preventDefault();
        let { username } = this.state
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken()

            // if (username) username =username.trim()
            let data = {
                username: username
            }
            console.log(data,token,"dgahsvdhsavdahsvjdj")
            FetchApi('POST', '/api/main/ticktok_username', data, token)
                .then(r => {
                    console.log(r.data)
                    if (r) {
                        this.setState({ msg: "Usename submitted successfully",showform:false })
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
            <div className="certificate-contact-parent">
                <div className="certificate-tiktok-parent">            
                    <div className="certificate-tiktok">
                    </div>
                </div>
                {this.state.showform && this.state.userdata.ticktok_username && this.state.userdata.verified ?
                <div className="certificate-submit-msg">
                    Your username is under verification.Your certificate will available after your username is verified(24 hrs).
                </div> :
                <form onSubmit={this.usernameSubmit}>
                <div className="form-first-child">
               <div className="certificate-errors-msg">
               <div className="certificate-errors">
                {this.state.errors ? <span>{this.state.errors}</span> : null}
                </div>
               </div>
               <div className="certificate-errors-msg">
               <div className="certificate-msg">
                {this.state.msg ? <span>{this.state.msg}</span> : null}
                </div>
               </div>

                    <div className="form-email">
                        <input
                            name="username"
                            type="text"
                            id="inputusername"
                            value={this.state.username}
                            onChange={this.handleChange}
                            placeholder="Enter your TickTok Username"
                            autoCapitalize="off"
                            autoCorrect="off"
                            autoComplete="off"
                            spellCheck="off"
                            required
                        />
                    </div>
                    <div className="certificate-button">
                    <button type="submit">Submit</button> 
                    </div>
                    <div className="certificate-link">
                    <a target="_black"  href="http://bit.ly/esthomso">Download this app from this link only (http://bit.ly/esthomso) </a>
                        </div>

                </div>
                    {/* <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        placeholder="Enter your TickTok Username"
                        required /> */}
                     
                </form>
                
                }
            </div>
        );
    }
}

