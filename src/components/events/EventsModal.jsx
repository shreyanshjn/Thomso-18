import React from 'react';
import EventDetail from './EventDetails';
import {EventDetails} from './events.js';
import './src/css/EventsModals.css';

export default class EventsModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eventId: this.props.id,
            subEventId: `${this.props.id}_1`,
            data:null
        };
        this.nextCat = this.nextCat.bind(this);
        this.prevCat = this.prevCat.bind(this);
    }
    componentDidMount(){
        let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
        this.setState({data: filteredData[0]});
    }
    nextCat = (id) => {
        if(id === 13){
            this.setState({eventId: 1}, () => {
                let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
                this.setState({data: filteredData[0]});
            })
        }else{
            this.setState({eventId: id + 1}, () => {
                let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
                this.setState({data: filteredData[0]});
            })
        }
    }
    prevCat = (id) => {
        if(id === 1){
            this.setState({eventId: 13}, () => {
                let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
                this.setState({data: filteredData[0]});
            })
        }else{
            this.setState({eventId: id - 1}, () => {
                let filteredData = EventDetails.filter(e => e.id === this.state.eventId);
                this.setState({data: filteredData[0]});
            })
        }
    }
    render(){
        // console.log(this.state)j;
        // console.log(this.props);
        return(
            <div className="events-modala">
                <div className="events-modala-main-child">
                    <div style={{height:"10%", display:"flex", justifyContent:"space-between", borderBottom: "white 1px solid"}}>
                        <p style={{marginLeft: "50px", color:"white", fontSize:"2.5em", textAlign:"left"}}>
                            {this.state.data && this.state.data.name}
                        </p>
                    <a href="#" className="events-modal-close" onClick={() => this.props.modalClose()}>
                        X
                    </a>
                </div>
                <div className="events-modala-second-child">
                    <div className="events-list-child">
                        <ul>
                            {this.state.data && this.state.data.subevents.map(e => 
                                <li key={e.id} onClick={() => this.setState({subEventId: e.id})}>
                                    <a href="#" className="events-custom-selection">{e.name}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    {this.state.data ? <EventDetail history={this.props.history} id={this.state.subEventId} detail={this.state.data} eventsId={this.state.eventId} subevents={this.state.data.subevents} data={this.props.data}/> : null }
                </div>
                    <div className="events-modals-last-arrow" style={{display:"flex", justifyContent:"space-between", marginTop:"15px"}}>
                        <a href="#" className="arrow-button-events" onClick={() => this.prevCat(this.state.eventId)}>
                            <img src="/img/main/events/leftarrow.png" width="15px" />
                        </a>
                        <a href="#" className="arrow-button-events">
                            <img src="/img/main/events/rightarrow.png" width="15px" onClick={() => this.nextCat(this.state.eventId)}/>
                        </a>
                    </div>
                    <hr style={{width:"98%",marginTop:"16px"}}/>
            </div>
        </div>
        )
    }
}
