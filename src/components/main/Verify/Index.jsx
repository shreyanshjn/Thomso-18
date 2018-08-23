import React from "react";
import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/main/AuthService';

export default class VerifyIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            otp: '',
            disabled: false
        }
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let { otp } = this.state;
            if (otp) otp = otp.trim()
            const data = { otp }
            const token = this.Auth.getToken()
            this.setState({
                disabled: true
            })
            FetchApi('POST', '/api/main/auth/verify', data, token)
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success === true) {
                            if (res.data.body) {
                                this.props.setUserData(res.data.body);
                            }
                            this.props.updateRoutes(true, true)
                            this.Auth.setToken(res.data.token);
                            this.props.history.push('/main')
                        } else {
                            this.setState({ errors: res.data.msg, disabled: false })
                        }
                    } else {
                        this.setState({ errors: 'Something Went Wrong', disabled: false });
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ errors: 'Something Went Wrong', disabled: false });
                })
        }
    }

    render() {
        const { otp, errors, disabled } = this.state;
        return (
            <div>
                <h1> Please verify your account.  </h1>
                <form onSubmit={this.onSubmit}>
                    {errors ?
                        <div style={{ color: 'red', fontSize: '22px' }}> {errors} </div>
                        :
                        null}
                    <div>
                        <div>
                            <label htmlFor="inputOTP"> Enter OTP 1511</label>
                            <input
                                id="inputOTP"
                                type="text"
                                placeholder="OTP"
                                name="otp"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="off"
                                value={otp}
                                onChange={this.onChange}
                                spellCheck="false"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={disabled}>Send Verification Email</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


} 