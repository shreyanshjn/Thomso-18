import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../handlers/controls/AuthService';
import FetchApi from '../../../utils/FetchAPI';

export default class HomeIndex extends Component {
    constructor() {
        super();
        this.state = {
           thomso_id:'',
           thomso_id1:'',
            errors:'',
            userData:[], 
            disabled:false,
            disabledPayment:false,
            payment_type:'',
            accomodation:'', 
            message:''
        };
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value, errors:"",message:'' });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let { thomso_id } = this.state;
            const data = {thomso_id};
            if (data && data.thomso_id) {
                this.setState({ disabled: true })
                const isAuthenticated = this.Auth.hasToken();
                    if (isAuthenticated) {
                        const token = this.Auth.getToken()
                        FetchApi('POST', '/api/controls/user_info', data, token)
                            .then(r => {
                                // console.log(r.data.body)
                                if (r && r.data && r.data.success && r.data.body && r.data.body.payment_type!==0) {
                                    this.setState({ userData: r.data.body ,disabled:false, thomso_id1:r.data.body.thomso_id});
                                }
                                else{
                                    if (r && r.data && r.data.success && r.data.body ) {
                                        this.setState({ disabled:false, errors:"user already verified"});
                                    }
                                }
                            })
                        .catch(e => {
                            if (e.response && e.response.data) {
                                this.setState({ disabled: false, errors: e.response.data.msg })
                            } else {
                                this.setState({ disabled: false, errors: 'Something went wrong' })
                            }
                        });
                }
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
    }

    onPayment = (e) => {
        e.preventDefault();
        if (!this.state.disabledPayment) {
            let { thomso_id1, payment_type, accomodation } = this.state;
            const data = {payment_type, accomodation, thomso_id1};
            if (data && data.payment_type && data.accomodation) {
                this.setState({ disabledPayment: true })
                const isAuthenticated = this.Auth.hasToken();
                    if (isAuthenticated) {
                        const token = this.Auth.getToken()
                        FetchApi('PUT', '/api/controls/payment_update', data, token)
                            .then(r => {
                                if (r && r.data && r.data.success) {
                                    this.setState({ disabledPayment:false,message:'Payment Verified' });
                                }
                            })
                        .catch(e => {
                            if (e.response && e.response.data) {
                                this.setState({ disabledPayment: false, errors: e.response.data.msg})
                            } else {
                                this.setState({ disabledPayment: false, errors: 'Something went wrong' })
                            }
                        });
                }
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
    }
    
    render() {
        const { errors, thomso_id,disabled, disabledPayment,userData ,payment_type,message, accomodation   } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {errors ?
                        <div style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>
                            {errors}
                        </div>
                        : null
                    }
                    <div>
                        <h2>Thomso ID</h2>
                    </div>
                    <div >
                        <div>
                            <input
                                name="thomso_id"
                                type="text"
                                id="inputThomsoID"
                                placeholder="Thomso ID"
                                value={thomso_id}
                                onChange={this.onChange}
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                spellCheck="off"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={disabled}>SUBMIT</button>
                    </div>
                </form>
                { userData && userData.thomso_id ?
                <div>
                    Thomso Id : {userData.thomso_id ? userData.thomso_id :null}<br />
                    Name : {userData.name ? userData.name :null}<br />
                    College : {userData.college ? userData.college :null}<br />
                    Contact : {userData.contact ? userData.contact :null}<br />
                    Branch : {userData.branch ? userData.branch :null}<br />
                    Gender : {userData.gender ? userData.gender :null}<br />
                    Address : {userData.address ? userData.address :null}<br />
                    State : {userData.state ? userData.state :null}<br />
                    <form onSubmit={this.onPayment}>
                        <div>
                            {console.log("sd", payment_type, accomodation)}
                            <label htmlFor="paymentType">Payment Type</label>
                            <select
                                id="paymentType"
                                name="payment_type"
                                value={payment_type}
                                onChange={this.onChange}
                                required
                            >
                                <option value="" disabled="true"> Payment Type </option>
                                <option value="1"> Online Payment </option>
                                <option value="2"> NEFT </option>
                                <option value="3"> Draft </option>
                                <option value="4"> Campus Ambassador </option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="inputType">Accomodation Type</label>
                            <select
                                id="inputType"
                                name="accomodation"
                                value={accomodation}
                                onChange={this.onChange}
                                required
                            >
                                <option value="" disabled="true"> Accomodation Type </option>
                                <option value="accomodation"> Accomodation </option>
                                <option value="non-accomodation"> Non-accomodation </option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" disabled={disabledPayment}>SUBMIT</button>
                        </div>
                    </form>
                    {message ?
                        <div style={{ textAlign: 'center', color: 'green', fontWeight: '600' }}>
                            {message}
                        </div>
                        : null
                    }
                </div>
                :null}

                <Link to="controls/logout" >LOGOUT</Link>
            </div>
           
        );
    }
}
