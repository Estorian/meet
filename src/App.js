import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, limitEvents } from './api';
import { InfoAlert } from './alert';
import './nprogress.css';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart
} from 'recharts';


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

    getData = () => {
        const { locations, events } = this.state;
        const data = locations.map((location) => {
            const number = events.filter((event) => event.location === location).length
            const city = location.split(' ').shift();
            return {city, number};
        });
        console.log(data);
        return data;
    }

    getGenreData = () => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map((genre) => {
            const value = this.state.events.filter((event) => event.summary.split(' ').includes(genre)).length
            return { name: genre, value }
        });
        return data;
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
                <div className="data-vis-wrapper">
                    <ResponsiveContainer height={400} >
                        <PieChart width={400} height={400}>
                            <Pie
                                data={this.getGenreData()}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                />
                        </PieChart>
                    </ResponsiveContainer>
                    
                    <ResponsiveContainer height={400} >
                        <ScatterChart
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            >
                            <CartesianGrid />
                            <XAxis type="category" dataKey="city" name="Place" />
                            <YAxis type="number" dataKey="number" name="Number of Events" allowDecimals={false} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter data={this.getData()} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                <EventList events={limitedList} eventListSize={this.state.eventListSize} />
            </div>
        );
    }
}

export default App;
