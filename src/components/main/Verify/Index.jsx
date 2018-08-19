import React from "react";
import FetchApi from "../../../utils/FetchAPI";
import validateInput from '../../../utils/validation/loginValidation';


export default class VerifyIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            errors:'',
            otp:'',
            disabled: false
        }
    }

    onChange = (e) => {
        const name= e.target.name;
        let value  = e.target.value;
        this.setState({ [name] : value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.disabled) {
            let {otp} = this.state;
            let email = "prashantverma1223@gmail.com";
            if (otp) otp = otp.trim()
            const data = {email, otp};
            console.log(data);

            const check = validateInput(email, 'email');
            if (check.isValid) {
                this.setState({
                    disabled: true
                })
                FetchApi('POST', '/api/main/auth/verify', data)
                    .then( res => {
                        this.setState({disabled:false});
                        if(res && res.data)
                            console.log(res.data);
                        else
                            this.setState({errors:'Incorrect OTP.'});
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({errors:'Something Went Wrong.', disabled:false});
                    })
            }
            else if (check.errors && check.errors.email) {
                this.setState({ errors: check.errors.email })
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
    }

    render(){
        const {otp, errors, disabled}  =this.state;
        return (
            <div>
                <h1> Please enter OTP sent to your email.  </h1>
                <form onSubmit={this.onSubmit}>
                    {errors ? 
                        <div style={{color:'red', fontSize:'22px'}}> {errors} </div>
                    :
                    null}
                    <div>
                        <div>
                            <label htmlFor="inputOTP"> Enter OTP</label>
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