import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import CitySearch from '../CitySearch';
import EventList from '../EventList';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppWrapper;
        given('The main page has loaded events', () => {
        });

        when('the user selects a city', () => {
            AppWrapper = mount(<App />);
            AppWrapper.setState({
                events: mockData,
                locations: extractLocations(mockData),
            });
            let CitySearchWrapper = AppWrapper.find(CitySearch);
            AppWrapper.find('.city').simulate('change', {target: {value: 'Berlin'} });
            expect(CitySearchWrapper.state('query')).toBe('Berlin');
            AppWrapper.find('.suggestions li').at(0).simulate('click');
            expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
        });

        then('The user should see a list of events in that city by title, but collapsed to hide details.', () => {
            AppWrapper.update();
            let EventListWrapper = AppWrapper.find('.event-list');
            expect(EventListWrapper.find('.expanded')).toBeNull;
            expect(EventListWrapper.find('.event-list li').length).toBeGreaterThan(0);
            AppWrapper.unmount();
        });
    });

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        let AppWrapper;

        given('The user can see a list of events,', () => {
            AppWrapper = mount(<App />);
            AppWrapper.setState({
                events: mockData,
                locations: extractLocations(mockData),
            });
        });

        when('the user clicks an event', () => {
            AppWrapper.update();
            AppWrapper.find('.detailsButton').at(0).simulate('click');
        });

        then('the event expands to show further detail about that event.', () => {
            expect(AppWrapper.find('.expanded')).not.toBeUndefined;
            AppWrapper.unmount();
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let AppWrapper = mount(<App />);
        AppWrapper.setState({
            events: mockData,
            locations: extractLocations(mockData),
        });
        
        given('The main page shows an expanded event with its details', () => {
            AppWrapper.update();
            AppWrapper.find('.detailsButton').at(0).simulate('click');
        });

        when('the user clicks on the expanded event', () => {
            AppWrapper.update();
            AppWrapper.find('.detailsButton').at(0).simulate('click');
        });

        then('the event collapses, hiding the extra details', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.expanded')).toBeNull;
            AppWrapper.unmount();
        });
    });
});