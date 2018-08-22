import React, { Component } from 'react';
import EventsOpening from './EventsOpening.jsx';
import './src/css/Index.css';

class EventsIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="index-main-div">
                <EventsOpening />
            </div>
        );
    }
}

export default EventsIndex;
