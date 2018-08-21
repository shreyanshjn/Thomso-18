import React from "react";
import { Link } from "react-router-dom";
import FetchApi from "../../../utils/FetchAPI";
import AuthService from '../../../handlers/main/AuthService';

export default class Sidebar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            event_id:'',
            event_name:'',
            error:'',
            disabled:true
        }
        this.Auth = new AuthService();
    }    

    onChange1 = (e)=>{
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value});
    }

    onSubmit = (e)=>{
        e.preventDefault();
            let {event_id, event_name} = this.state;
            let name = event_name
            const data = {event_id, name}
            console.log(data)
                FetchApi('POST','/api/main/addEvent',data)
                .then( res => {
                    if(res && res.data){
                        console.log(res.data)
                        if(res.data.success){
                            this.setState({  error: res.data.msg })
                        }
                        else{
                            
                            this.setState({
                                disabled:false,
                                error:res.data.msg
                            })
                        }
                    }
                })
                .catch(e=>{
                        this.setState({ error:e.response.msg })
                });
    }

    onChange = (e)=>{
        let value = e.target.value;
        this.setState({ event_id: value, disabled:false});
    }

    onRemove = (e)=>{
        e.preventDefault()
        let {event_id} = this.state;
        event_id = JSON.stringify(event_id)
        const data = {event_id}
        const token = this.Auth.getToken()
        FetchApi('POST','/api/main/removeParticipant', data, token)
            .then(res=>{
                // console.log(res.data)
                if(res && res.data){
                    this.setState({error:res.data.msg, disabled:true})
                }
            })
            .catch(e=>{
                this.setState({error:'something'})
            })
    }

    
    render(){
        const { error, event_id, event_name, disabled} = this.state;
        return (
            <div>
                {this.props.userData.thomso_id ? this.props.userData.thomso_id : null}
               {this.props.userData.name ? this.props.userData.name : null}  <br/>
               {this.props.userData.email ? this.props.userData.email : null}<br/>


                {error?<div style={{color:'red', fontSize:'22px'}}>{error}</div>:null}

                <br/><br/><br/>
                
                {this.props.userData.event[0] ? 
                <div>click to select event to delete

                 {this.props.userData.event.map((data,i) => {
                     return <li value={data.event_id} key={data._id} onClick={this.onChange}>{data.event_id}{data.name} </li>
                 } ) 
                 }

                 <form onSubmit={this.onRemove}>
                        <button type="submit"  disabled={disabled}>Delete Event</button> 
                    </form>
                </div>
                : <div>no event to delete first so to event page and register for events</div>  }

                <Link to="/main/event">
                    Event
                </Link><br/>
                <h4> Add event here</h4>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <div>
                            <label htmlFor="inputEmail">Event id</label>
                            <input
                                name="event_id"
                                type="text"
                                id="inputEmail"
                                placeholder="event_id"
                                value={event_id}
                                onChange={this.onChange1}
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                spellCheck="off"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="inputPassword">Name</label>
                            <input
                                id="inputPassword"
                                type="text"
                                name="event_name"
                                onChange={this.onChange1}
                                value={event_name}
                                autoComplete="off"
                                autoCapitalize="off"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit"  >Add event</button>
                        </div>
                    </div>
                </form> 
                
               <Link to="/main/logout">
                    Logout
                </Link>
            </div>
        );
    }
}
