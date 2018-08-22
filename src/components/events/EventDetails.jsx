import React from 'react';
import './src/css/EventsModals.css';

export default class EventDetail extends React.Component{
    constructor(){
        super();
        this.state = {
            disabled: false,
            wait: false,
        };
        this.registerEvent = this.registerEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    registerEvent(eventId, id){
        this.setState({wait: true, disabled: true});
        let data = {
            event: eventId,
            subevent: id
        }
    }
    handleChange(id){
        console.log(id);
        let filteredData = this.props.subevents.filter(s => s.id === id);
        console.log(filteredData);
        console.log(this.props.data);
        this.setState({data: filteredData[0]});
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        let filteredData = nextProps.detail.subevents.filter(e => e.id === nextProps.id);
        this.setState({data: filteredData[0]});
    }
    render(){
        // console.log(this.props);
        return(
            <div className="events-details-images-main-div">
                <p style={{fontSize:"2em", color:"white", textAlign:"center", margin:"0px"}}>{this.state.data && this.state.data.name}</p>                                
                <div className="events-dropdown">
                    <select style={{width:"100%", background:"transparent", color:"white"}} onChange={(e) => this.handleChange(e.target.value)}>
                        {this.props.subevents.map(s => 
                        <option value={s.id} key={s.id} style={{color: "#000000"}}>{s.name}</option>
                    )}
                    </select>
                </div>
                {this.state.data ? 
                <div className="events-details-parent">
                    <div className="events-details-image">
                        <img src={`/img/main/events/events/${this.state.data.image}`} style={{maxHeight: "240px"}}/>
                    </div>
                    <div className="events-text-scroll-cont">
                    <p className="events-text-child">{this.state.data.content}</p>
                    </div>
                </div>: null}
                {this.state.data && this.props.eventsId !== 9? 
                <div style={{display:"flex", justifyContent:"space-around", height:"10%"}}>
                    {this.state.registered ? 
                        <a className="events-modal-button" style={{background: "#ffffff", color: '#000000'}} disabled={this.state.disabled}>Registered</a> 
                        : 
                        this.props.login ? <a className="events-modal-button" onClick={() => this.registerEvent(this.props.eventsId, this.props.id)}>
                            {this.state.wait ? 'Please Wait..' : 'Register'}
                        </a> : 
                        <a className="events-modal-button" href="/register">Login/Register</a>
                    }
                    <a href={`/pdf/events/${this.state.data.rulebook}`} className="events-modal-button" target="_blank">Rulebook</a>
                </div> : null}
                {this.state.data && this.props.eventsId === 9 ? <div style={{display:"flex", justifyContent:"space-around", height:"10%", color: '#fff', fontSize: '1.25em'}}>Registrations for this event will me made on the spot</div> : null}
            </div>
        )
    }
}

