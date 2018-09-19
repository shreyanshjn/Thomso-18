import React from 'react';
import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";
import DataTable from './DataTable';
export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            userData:[],
            errors:'',
            isAuthenticated:false
        };
        this.Auth = new AuthService();
    }

    componentDidMount() { 
        const isAuthenticated = this.Auth.hasToken();
        // console.log(isAuthenticated,  "isAuthenticated");
        if (isAuthenticated) {
            const token = this.Auth.getToken()
            FetchApi('GET', '/api/main/admin/user', null, token)
                .then(r => {
                    if (r && r.data) {
                        if (r.data.body) {
                            console.log(r.data.body)
                            this.setState({ userData:r.data.body });
                        } else {
                            this.setState({ errors:"Doesn't Able To Fetch" })
                        }
                    }
                })
                .catch(e => {
                    if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                    else this.setState({errors:'Something Went Wrong'})
                });
        }
    }

    render(){
        let {userData, errors} = this.state;
        return (
            <div>
                {errors ?
                <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                    {errors}
                </div>
                : null}
                {(userData && userData.length) ? <DataTable participants={userData} /> :null}
            </div>
        )
    }
}
