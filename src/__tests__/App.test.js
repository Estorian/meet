// src/__tests__/App.test.js

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents, limitEvents } from '../api';

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    })

});

describe('<App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventState = AppWrapper.state('events');
        expect(AppEventState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('App passes "eventListSize" state as a prop to NumberOfEvents', () => {
        const AppWrapper = mount(<App />);
        const AppNumberState = AppWrapper.state('eventListSize');
        expect(AppNumberState).not.toEqual(undefined);
        expect(AppWrapper.find(NumberOfEvents).props().number).toEqual(AppNumberState);
        AppWrapper.unmount();
    });

    test('Changing the number in NumberOfEvents changes eventListSize', () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const newNumber = { target: { value: 3 } };
        NumberOfEventsWrapper.find('.number').simulate('change', newNumber);
        expect(AppWrapper.state('eventListSize')).toBe(3);
        AppWrapper.unmount();
    });

    test('eventListSize matches number of events in eventList', () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({
            events: mockData,
            limitedList: limitEvents(mockData, AppWrapper.state('eventListSize'))
        })
        const EventListWrapper = AppWrapper.find(EventList);
        const eventListSize = AppWrapper.state('eventListSize');
        expect(EventListWrapper.find('.list li')).toHaveLength(eventListSize);
        AppWrapper.unmount();
    })

    test('Changing the number of events in NumberOfEvents will change the number of events displayed in EventList', () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({
            events: mockData,
            limitedList: limitEvents(mockData, AppWrapper.state('eventListSize'))
        });
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        NumberOfEventsWrapper.find('.number').simulate('change', { target: { value: 5 } });
        const EventListWrapper = AppWrapper.find(EventList);
        expect(AppWrapper.state('eventListSize')).toBe(5);
        expect(EventListWrapper.find('.list li')).toHaveLength(5);
        AppWrapper.unmount();
    });

});