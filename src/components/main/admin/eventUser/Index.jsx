import React from 'react'
import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";

export default class EventUserIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            authenticated : false,
            errors:'',
            event:[]
        }
        this.Auth = new AuthService();
    }

    componentDidMount(){
        const authenticated = this.Auth.hasToken();
        if(authenticated){
            const token = this.Auth.getToken()
            FetchApi('GET','/api/main/admin/fetchEvents',null,token)
            .then(res => {
                if(res && res.data){
                    if(res.data.success){
                        this.setState({event:res.data.body})   
                    }
                    else this.setState({errors:'Unable to fetch events'})
                }
            })
            .catch( e=> {
                if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                else this.setState({errors:'Something Went Wrong'})
            })
        }
        else this.setState({errors:'Unauthenticated'})
    }

    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { event_id, event_name, isPrimary } = this.state;
        if (event_id) event_id = event_id.trim();
        if (event_name) event_name = event_name.trim();
        const data = { event_id, name: event_name, isPrimary }
        if (data.event_id && data.name && typeof(data.isPrimary) === "boolean") {
            const token = this.Auth.getToken()
            this.setState({disabled: true})
            FetchApi('POST', '/api/main/addEvent', data, token)
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success) {
                            this.setState({ 
                                disabled: false,
                                error: res.data.msg
                            })
                        }
                        else {
                            this.setState({
                                disabled: false,
                                error: res.data.msg
                            })
                        }
                    }
                })
                .catch(e => {
                    if(e && e.response && e.response.data && e.response.data.msg)
                        this.setState({ disabled: false, error: e.response.data.msg })
                    else this.setState({ disabled: false, error: "something went wrong" })
                });
        }
    }

    render(){
        let {errors, event} = this.state;
        return(
            <div>
                {errors ?
                <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                    {errors}
                </div>
                : null}
                <table>
                    <thead>
                        <tr>
                            <td>Event ID</td>
                            <td>Event Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(event && event.length>0)? 
                        event.map( (data,i )=>{
                            <tr value={data.event_id} key={i} onClick={this.onChange}>
                                <td>{data.event_id}</td>
                                <td>{data.name}</td>
                                <td><button onClick={this.onSubmit}>Fetch Participants</button></td>
                            </tr>
                        }) : null}
                    </tbody>
                </table>

            </div>
        )
    }
}