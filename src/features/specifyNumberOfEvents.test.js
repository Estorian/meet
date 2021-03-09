import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import CitySearch from '../CitySearch';
import EventList from '../EventList';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When a user has not specified a number, 10 is the default number', ({ given, when, then }) => {
        let AppWrapper = mount(<App />);
        AppWrapper.setState({
            events: mockData,
            locations: extractLocations(mockData),
        });
        
        given('The main page shows events from a city', () => {
        });

        when('The user loads the list of events', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event li')).not.toBeNull;
        });

        then('ten events are loaded by default.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event-list li')).toHaveLength(10);
            AppWrapper.unmount();
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper = mount(<App />);
        AppWrapper.setState({
            events: mockData,
            locations: extractLocations(mockData),
        });

        given('the main page shows event from a city', () => {
        });

        when('the user inputs the number of events they want to see per page', () => {
            AppWrapper.update();
            AppWrapper.find('.number').simulate('change',{ target: { value: 5}});
        });

        then('the number of events on the page changes to match the number they input', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event-list li')).toHaveLength(5);
            AppWrapper.unmount();
        });
    });

});