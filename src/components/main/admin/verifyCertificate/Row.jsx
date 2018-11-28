import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";
import React from 'react';

export default class VerifyCertificate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated : false,
            errors:'',
            user:[],
            verified:false
        }
        this.Auth = new AuthService();
    }

    
    switchBlock = (email,verify) =>{
        // e.preventDefault();
        // const verify = !!!this.state.verified;
        var data = {email:email, ticktok_verified:verify};
        console.log(data, verify)
        this.setState({verified:verify})
        if(data){
            const isAuthenticated = this.Auth.hasToken();
            if(isAuthenticated){
                const token = this.Auth.getToken();
                // console.log(data,token)
                FetchApi('PUT','/api/main/admin/certificate_verify',data,token)
                .then( res => {
                    if(res && res.data && res.data.success){
                        this.setState({errors:"Done"})
                    }
                    else this.setState({errors:"Unable To verify."})
                })
                .catch( err => {
                    console.log(err);
                    this.setState({errors:"Something Went Wrong!!"})
                })
            }else this.setState({errors:"Unauthenticated"})
        }else this.setState({errors:"invalid Request"})
    }       

    
    render(){
        let {data} = this.props;
        
        return (
            <React.Fragment>
                {data ? 
                    <tr style={{border: 'solid 1px black',textAlign: 'center'}} key={i} >
                        <td>{data.thomso_id ? data.thomso_id : '--'}</td>
                        <td>{data.name ? data.name : '--'}</td>
                        <td>{data.email ? data.email : '--'}</td>
                        <td>{data.contact ? data.contact : '--'}</td>
                        <td>{data.college ? data.college : '--'}</td>
                        <td>{data.ticktok_username ? data.ticktok_username : '--'}</td>
                        <td style={{textAlign: 'center'}}>
                            <button onClick={()=>this.switchBlock(data.email,!!!data.ticktok_verified)} value={data.email}>
                                {data.ticktok_verified?
                                'Unverify' : 
                                'Verify'}
                            </button>
                        </td>
                        <td>
                            {errors ?
                                <span style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                                    {errors}
                                </span>
                            : null}
                        </td>
                    </tr>
                    :null
                }
            </React.Fragment>
        )
    }
}
