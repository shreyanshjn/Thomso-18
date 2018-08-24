import React from "react";
// import { Link } from "react-router-dom";
import FetchApi from "../../../utils/FetchAPI";
import validateInput from '../../../utils/validation/loginValidation';

export default class ResetPasswordEmailIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            errors:'',
            email:'',
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
            let {email} = this.state;
            if(email) email = email.trim();
            const data = {email}
            const check = validateInput(email, 'email')
            if(check.isValid){
                this.setState({disabled:true})
                FetchApi('POST','/api/main/auth/resetEmail',data)
                .then( res => {
                    if(res && res.data){
                        if(res.data.success) this.props.history.push('/main/resetPassword')
                        else this.setState({errors:res.data.msg})
                    }
                })
                .catch(e=>{
                    if(e && e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                    else this.setState({errors:"Something Went Wrong"})
                });
            }
            else if (check.errors && check.errors.email)  this.setState({ errors: check.errors.email })
            else  this.setState({ errors: 'Fields cannot be empty' })
        }
    }


    render(){
        const {email, errors, disabled} = this.state;
        return(
            <div>
                <h1>Enter Email</h1>
                <form onSubmit={this.onSubmit}>
                    {errors?<div style={{color:'red', fontSize:'22px'}}>{errors}</div>:null}
                    
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
                            <button type="submit" disabled={disabled} >Login</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}