// NumberOfEvents.js

import React, { Component } from 'react';

class NumberOfEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventListSize: props.number,
        }
    }

    handleInputChange = (event) => {
        const number = event.target.value
        this.setState({
            eventListSize: number
        });
        this.props.updateListSize(number);
    }

    render() {
        return <div className='NumberOfEvents'>
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