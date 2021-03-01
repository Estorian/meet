// Event.test.js

import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockEvent } from '../mock-data';

describe('<Event />', () => {
    let EventWrapper;
    beforeEach(() => {
        EventWrapper = shallow(<Event event={mockEvent}/>)
    });

    test('renders the event summary, date, and location', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
        expect(EventWrapper.find('.date')).toHaveLength(1);
        expect(EventWrapper.find('.location')).toHaveLength(1);
    });

    test('render show details button', () => {
        expect(EventWrapper.find('.detailsButton')).toHaveLength(1);
    });

    test('correctly renders event summary and location', () => {
        expect(EventWrapper.find('.summary').text()).toBe(mockEvent.summary);
        expect(EventWrapper.find('.location').text()).toBe(mockEvent.location);
    });

    test('clicking show details button expands the event', () => {
        EventWrapper.find('.detailsButton').simulate('click');
        expect(EventWrapper.find('.expanded')).toHaveLength(1);
    });

    test('expanded details include accurate description and hide details button', () => {
        EventWrapper.find('.detailsButton').simulate('click');
        expect(EventWrapper.find('.description').text()).toBe(mockEvent.description);
        expect(EventWrapper.find('.detailsButton').text()).toBe('Hide details');
    });
    test('clicking the hide details button removes the expanded details', () => {
        EventWrapper.find('.detailsButton').simulate('click');
        expect(EventWrapper.find('.detailsButton').text()).toBe('Hide details');
        EventWrapper.find('.detailsButton').simulate('click');
        expect(EventWrapper.find('.expanded')).toHaveLength(0);
    })

})