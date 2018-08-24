import React from "react";
import FetchApi from "../../../utils/FetchAPI";
export default class ResetPasswordEmailIndex extends React.Component{
    constructor(){
        super();
        this.state = {
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
            let {password, confirmPassword, tempPassword} = this.state;
            const data = {password, tempPassword}
            if(password === confirmPassword){
                FetchApi('POST','/api/main/auth/resetPassword',data)
                .then( res => {
                    if(res && res.data){
                        this.setState({disabled:true})
                        console.log(res.data)
                        this.props.push.history('/main/login')   
                    }
                })
                .catch(e=>{
                        this.setState({errors:e.response.data.msg,disabled:true})
                });
            }
            else{
                this.setState({errors:"Password Didn't match",disabled:true})
            }
           
        }
    }


    render(){
        const {tempPassword, password, confirmPassword, errors, disabled} = this.state;
        return(
            <div>
                <h1> Login Here ...</h1>
                <form onSubmit={this.onSubmit}>
                    {errors?<div style={{color:'red', fontSize:'22px'}}>{errors}</div>:null}
                    
                    <div>
                        <div>
                            <label htmlFor="inputTempPassword">Temp Password</label>
                            <input
                                name="tempPassword"
                                type="password"
                                id="inputTempPassword"
                                placeholder="Enter Password Sent to Mail"
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