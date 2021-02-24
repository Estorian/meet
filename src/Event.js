// Event.js

import React, { Component } from 'react';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    }

    handleShowDetails(bool) {
        this.setState({
            showDetails: bool
        });
    }

    render() {
        const { summary, location, description, link } = this.props.content;
        const date = this.props.content.start.dateTime;

        let details;
        if (this.state.showDetails) {
            details = <div className='expanded'>
                <h2>About event</h2>
                <p className='description'>{description}</p>
                <a className='link' href={link}>See details on Google Calendar</a>
                <button className='detailsButton' onClick={() => this.handleShowDetails(false)}>Hide details</button>
            </div>
        } else {
            details = <button className='detailsButton' onClick={() => this.handleShowDetails(true)}>Show Details</button>
        }

        return <div className='event'>
            <h1 className='summary' >{summary}</h1>
            <p className='date'>{date}</p>
            <p className='location'>{location}</p>
            {details}
        </div>
    };
};

export default Event;