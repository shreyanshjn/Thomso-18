import React from "react";
import AuthService from '../../../handlers/main/AuthService';
import FetchApi from "../../../utils/FetchAPI";

export default class HomeIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:'',
            disabled:true,
            event_id:'',
            event:[]
        }
        this.Auth = new AuthService();
    }

    componentWillMount(){
        FetchApi('GET','/api/main/fetchEvent',null )
            .then( res => {
                if(res && res.data){
                    // console.log(res.data.event)
                    if(res.data.success)
                        this.setState({event:res.data.event})
                    else this.setState({error:'event not found'})
                }
            })
            .catch( e=> {
                console.log(e);
                this.setState({error: ' something went wrong'});
            })
    }


    onChange = (e)=>{
        let value = e.target.value;
        // console.log(value)
        this.setState({ event_id: value, disabled:false});
    }

    onAdd = (e)=>{
        e.preventDefault()
        let {event_id} = this.state;
        event_id = JSON.stringify(event_id)
        const data = {event_id}
        const token = this.Auth.getToken()
        // console.log(event_id);
        FetchApi('POST','/api/main/addParticipant', data, token)
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
        const {disabled, error,event} = this.state;
        return (
            <div>
               hello    
               {error?<div style={{color:'red', fontSize:'22px'}}>{error}</div>:null}

                <br/>
                select event to add, if there is no event first go to /main and add events , then register
                {event.map((data,i) => {
                     <br/>
                     return <li value={data.event_id} onClick={this.onChange}>{data.event_id}{data.name} </li>
                 } ) 
                 }

                  <form onSubmit={this.onAdd}>
                        <button type="submit"  disabled={disabled}>Add Event</button> 
                    </form>
            </div>
        );
    }
}