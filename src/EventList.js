// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {

    render() {
        if (!this.props.events) {
            return (<div className="event-list"></div>)
        };
        const events = this.props.events;

        return (
            <div className="event-list">
                <ul className="list">
                    {events.map(event => 
                        <li key={event.id}>
                            <Event event={event} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default EventList;