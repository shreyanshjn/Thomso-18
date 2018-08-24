import React from "react";
import FetchApi from "../../../utils/FetchAPI";
import validateInput from '../../../utils/validation/loginValidation';


export default class ResetPasswordEmailIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            email:'',
            errors:'',
            password:'',
            confirmPassword:'',
            tempPassword:'',
            disabled:true
        }
    }
    onChange = (e)=>{
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value, disabled:false});
    }
    onSubmit = (e)=>{
        e.preventDefault();
        if(!this.state.disabled){
            let {email,password, confirmPassword, tempPassword} = this.state;
            const data = {email,password, tempPassword}
            const check = validateInput(data)
            if (check.isValid) {
                if(password === confirmPassword){
                    FetchApi('POST','/api/main/auth/resetPassword',data)
                    .then( res => {
                        if(res && res.data){
                            if(res.data.success) this.props.history.push('/main/login')   
                            else this.setState({errors:res.data.msg})
                            this.setState({disabled:true})
                        }
                    })
                    .catch(e=>{
                       if(e && e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg,disabled:true})
                       else this.setState({errors:'Something Went Wrong'})
                    });
                }
                else this.setState({errors:"Password Didn't match",disabled:true})
            }
            else if (check.errors && check.errors.email) this.setState({ errors: check.errors.email })
            else if (check.errors && check.errors.password)  this.setState({ errors: check.errors.password })
            else  this.setState({ errors: 'Fields cannot be empty' })
        }
    }

    render(){
        const {email,tempPassword, password, confirmPassword, errors, disabled} = this.state;
        return(
            <div>
                <h1> Enter Password Sent to your mail</h1>
                <form onSubmit={this.onSubmit}>
                    {errors?<div style={{color:'red', fontSize:'22px'}}>{errors}</div>:null}
                    
                    <div>
                        <div>
                            <label htmlFor="inputEmail">Email ID</label>
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
                            <label htmlFor="inputTempPassword">Reset Code</label>
                            <input
                                name="tempPassword"
                                type="password"
                                id="inputTempPassword"
                                placeholder="Reset Code"
                                value={tempPassword}
                                onChange={this.onChange}
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                spellCheck="off"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="inputPassword">New Password</label>
                            <input
                                name="password"
                                type="password"
                                id="inputPassword"
                                placeholder="New Password"
                                value={password}
                                onChange={this.onChange}
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                spellCheck="off"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="inputConfirmPassword">Email</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                id="inputConfirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={this.onChange}
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                spellCheck="off"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={disabled} >Login</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}