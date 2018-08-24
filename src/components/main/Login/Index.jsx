import React from "react";
// import {Route} from "react-router-dom";
import FetchApi from "../../../utils/FetchAPI";
import validateInput from '../../../utils/validation/loginValidation';
import AuthService from '../../../handlers/main/AuthService';

export default class LoginIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: '',
            email: '',
            password: '',
            disabled:''
        }
        this.Auth = new AuthService();
    }

    onChange = (e)=>{
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value});
    }

    onSubmit = (e)=>{
        e.preventDefault();
        if(!this.state.disabled){
            let {email, password} = this.state;
            if(email) email = email.trim();
            const data = {email, password}
            const check = validateInput(data)
            if(check.isValid){
                this.setState({disabled:true})
                FetchApi('POST','/api/main/auth/login',data)
                .then( res => {
                    if(res && res.data){
                        // console.log(res.data)
                        if(res.data.success){
                            this.Auth.setToken(res.data.token)
                            this.props.updateRoutes(true, true)
                            this.props.setUserData(res.data.body)
                            this.props.history.push('/main')
                        }
                        else{
                            if(!res.data.otpVerified){
                                // this.props.updateRoutes(true, true)
                                this.props.history.push('/main/verify')
                            }
                            else if (res.data.notExists) {
                                this.setState({ disabled: false, errors: 'Email does not exists. Please Register' })
                            }  else if (res.data.mismatch) {
                                this.setState({ disabled: false, errors: 'Password did not match' })
                            }else{
                                this.setState({
                                    disabled:false,
                                    errors:res.data.msg
                                })
                            }
                        }
                    }
                })
                .catch(e=>{
                    if (e.response && e.response.data) {
                            this.setState({ disabled: false, errors:e.response })
                    } else {
                        this.setState({ disabled: false, errors: 'Something went wrong' })
                    }
                });
            }
            else if (check.errors && check.errors.email) {
                this.setState({ errors: check.errors.email })
            } else if (check.errors && check.errors.password) {
                this.setState({ errors: check.errors.password })
            } else {
                this.setState({ errors: 'Fields cannot be empty' })
            }
        }
    }

    render(){
        const {email, password, errors, disabled}  =this.state;
        return (
            <div>
                <h1> Login Here ...</h1>
                <form onSubmit={this.onSubmit}>
                {errors?<div style={{coloe:'red', fontSize:'22px'}}>{errors}</div>:null}
                    <div>
                        <div>
                            <label htmlFor="inputEmail">Email</label>
                            <input
                                name="email"
                                type="email"
                                id="inputEmail"
                                placeholder="Email"
                                value={email}
                                onChange={this.onChange}
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                spellCheck="off"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="inputPassword">Password</label>
                            <input
                                id="inputPassword"
                                type="password"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                                autoComplete="off"
                                autoCapitalize="off"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={disabled} >Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
