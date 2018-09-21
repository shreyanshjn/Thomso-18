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
                                Quizardry
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
                                Campus Clicks
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
                            <Link to="/xpression">
                                <div className="onlineevents-mainpage-cards-image-xpression">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                Xpression 
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/xpression">
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
                                Silhoutte 
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
                            <Link to="/meme">
                                <div className="onlineevents-mainpage-cards-image-meme">
                                </div>
                            </Link>
                            <div className="onlineevents-mainpage-cards-title">
                                Meme
                            </div>
                            <div className="onlineevents-mainpage-cards-button">
                                <Link to="/meme">
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
                                Mr and Miss Thomso
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
