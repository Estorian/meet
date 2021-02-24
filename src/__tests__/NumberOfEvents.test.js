
import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { mockEvent } from '../mock-data';

describe('<NumberOfEvents />', () => {
    let NumberOfEventsWrapper;
    beforeEach(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    })

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
    });

    test('default number of events is 32', () => {
        expect(NumberOfEventsWrapper.state('eventsPerPage')).toBe(32);
    });

    test('renders text input correctly', () => {
        const eventsPerPage = NumberOfEventsWrapper.state('eventsPerPage');
        expect(NumberOfEventsWrapper.find('.number').prop('value')).toBe(eventsPerPage);
    });

    test('correctly changes state to match the input field', () => {
        NumberOfEventsWrapper.setState({
            eventsPerPage: 5
        });
        const eventObject = { target: { value: 45 } };
        NumberOfEventsWrapper.find('.number').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('eventsPerPage')).toBe(45);
    })
})