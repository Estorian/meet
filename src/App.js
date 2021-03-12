import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, limitEvents } from './api';
import { InfoAlert, WarningAlert } from './alert';
import './nprogress.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            events: [],
            locations: [],
            eventListSize: 10,
            limitedList: []
        }
    }

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
                let limitedList = limitEvents(events, this.state.eventListSize)
                this.setState({
                    events,
                    locations: extractLocations(events),
                    limitedList: limitedList,
                });
            }
        });
    }



    componentWillUnmount() {
        this.mounted = false;
    }

    updateEvents = (location) => {
        getEvents().then((events) => {
            const locationEvents = (location === 'all' || location === '') ?
                events :
                events.filter((event) => event.location === location);
            let limitedList = limitEvents(locationEvents, this.state.eventListSize);
            this.setState({
                events: locationEvents,
                limitedList: limitedList
            });
        });
    }

    updateListSize = (number) => {
        let limitedList = limitEvents(this.state.events, number);
        this.setState({
            eventListSize: number,
            limitedList: limitedList
        });
    }

    render() {
        let { limitedList } = this.state;
        let offlineAlertText = '';

        if (!navigator.onLine) {
            offlineAlertText = 'You are currently offline. Event list may not be current.';
        }

        return (
            <div className="App">
                <InfoAlert text={offlineAlertText} />
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <NumberOfEvents number={this.state.eventListSize} updateListSize={this.updateListSize} />
                <EventList events={limitedList} eventListSize={this.state.eventListSize} />
            </div>
        );
    }
}

export default App;
