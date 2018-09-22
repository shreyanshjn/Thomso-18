import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../beta/home/Navbar'
import './src/css/OnlineEvents.css'

class OnlineEventsIndex extends Component {
    render() {
        return (
            <div className="onlineevents-mainpage-parent">
                <Navbar background='true'/>
                <div className="main-parent-online-events-1">
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/quizardry">
                                <div className="onlineevents-mainpage-cards-image-quizardry">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                QUIZARDRY
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/quizardry">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/campusclicks">
                                <div className="onlineevents-mainpage-cards-image-campusclicks">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                CAMPUS CLICKS
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/campusclicks">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/meme">
                                <div className="onlineevents-mainpage-cards-image-meme">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                MAY MAY MAKING
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/meme">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-parent-online-events-1">
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/silhoutte">
                                <div className="onlineevents-mainpage-cards-image-silhoutte">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                SILHOUETTE 
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/silhoutte">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="onlineevents-mainpage-parent-child">
                        <div className="onlineevents-mainpage-cards">
                            <Link to="/Mr&MissThomso">
                                <div className="onlineevents-mainpage-cards-image-mrmissthomso">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                Mr. AND Ms. THOMSO ONLINE
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/Mr&MissThomso">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OnlineEventsIndex
