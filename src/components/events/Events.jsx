import React from 'react';
import EventsModal from './EventsModal';

class EventsMain extends React.Component{
    constructor(){
        super();
        this.state = {
            data: false,
            showModal: false,
            eventId: false
        }
        this.showEventModal = this.showEventModal.bind(this);
    }
    render(){
        return(
            <div>
                {this.state.data ? 
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        backgroundImage: "url('/img/main/updating.jpg')",
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'center'
                    }}
                ></div>:
                <div className="body">
                    {this.state.showModal && this.state.dataEvents ? <EventsModal history={this.props.history} login={this.props.isLoginSuccess.is_authenticated} id={this.state.eventId} modalClose={() => this.setState({showModal: false})} data={this.state.dataEvents ? this.state.dataEvents : null}/> : null}
                    <div className="container-fluid">
                        <div style={this.state.mobile ? {marginTop:"15px", marginBottom:"50px"} : {marginTop:"150px", marginBottom:"50px"}}>
                            <div style={{color:"white", fontSize:"1em"}}>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <div className="contact-us-img" style={{marginBottom: "50px"}}>
                                        <p className="contact-us" style={{fontFamily: 'prashant'}}>
                                            Events
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <div style={{padding:"0px"}}>
                                            <div className="thomso-pin-grid">
                                                <figure className="nik-custom-effect-glass black_white_new">
                                                    <img src={`/img/main/events`}/>
                                                    <figcaption>
                                                        <h2 style={{fontFamily: 'prashant'}}></h2>
                                                    </figcaption>
                                                </figure>
                                            </div>
                                        )}
                                        </div>
                                        <div style={{padding:"0px"}}>
                                            <div className="thomso-pin-grid">
                                                <figure className="nik-custom-effect-glass black_white_new">
                                                    <img src={`/img/main/events/`}/>
                                                    <figcaption>
                                                        <h2 style={{fontFamily: 'prashant'}}></h2>
                                                    </figcaption>
                                                </figure>
                                            </div>
                                        )}
                                        </div>
                                        <div style={{padding:"0px"}}>
                                            <div className="thomso-pin-grid">
                                                <figure className="nik-custom-effect-glass black_white_new">
                                                    <img src={`/img/main/events/`}/>
                                                    <figcaption>
                                                        <h2 style={{fontFamily: 'prashant'}}></h2>
                                                    </figcaption>
                                                </figure>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            }
        </div>
        )
    }
}
//connect redux to this component
