// NumberOfEvents.js

import React, { Component } from 'react';
import {ErrorAlert} from './alert';

class NumberOfEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventListSize: props.number,
            errorText: ''
        }
    }

    handleInputChange = (event) => {
        const number = event.target.value
        if (number <= 0) {
            this.setState({
                eventListSize: number,
                errorText: 'Please select a valid number.'
            });
        } else {
            this.setState({
                eventListSize: number,
                errorText: ''
            });
        }
        this.props.updateListSize(number);
    }

    render() {
        return <div className='NumberOfEvents'>
            <ErrorAlert text={this.state.errorText} />
            <input 
                type="number"
                className="number"
                placeholder="32"
                value={this.state.eventListSize}
                onChange={this.handleInputChange}

            />
        </div>
    }
}

export default NumberOfEvents;