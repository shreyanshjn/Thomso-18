import React, { Component } from 'react';

import EventsOpening from './EventsOpening.jsx';
import './src/css/Index.css';

class EventsIndex extends Component {
    render() {
        return (
            <div className="index-main-div">
                <EventsOpening history={this.props.history} />
            </div>
        );
    }
}

export default EventsIndex;
