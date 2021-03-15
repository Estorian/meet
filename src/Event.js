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
        const { summary, location, description, htmlLink } = this.props.event;
        const date = new Date(this.props.event.start.dateTime).toString();

        let details;
        if (this.state.showDetails) {
            details = <div className='expanded'>
                <h3>About event</h3>
                <p className='description'>{description}</p>
                <a 
                    className='link' 
                    href={htmlLink} 
                    target="_blank"
                    rel="noreferrer noopener"
                    >
                    See details on Google Calendar
                </a>
                <br></br>
                <button className='detailsButton' onClick={() => this.handleShowDetails(false)}>Hide details</button>
            </div>
        } else {
            details = <button className='detailsButton' onClick={() => this.handleShowDetails(true)}>Show Details</button>
        }

        return <div className='event'>
            <h2 className='summary' >{summary}</h2>
            <p className='date'>{date}</p>
            <div className='place'>
                <img 
                    src="map-pin.svg" 
                    alt=''
                    height="5px"
                    width="5px"
                />
                <p className='location'>{location}</p>
            </div>
            {details}
        </div>
    };
};

export default Event;