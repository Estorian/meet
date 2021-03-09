Feature: Show/Hide an event's details

Scenario: An event element is collapsed by default
Given The main page has loaded events
When the user selects a city
Then The user should see a list of events in that city by title, but collapsed to hide details.

Scenario: User can expand an event to see its details.
Given The user can see a list of events,
When the user clicks an event
Then the event expands to show further detail about that event.

Scenario: User can collapse an event to hide its details
Given The main page shows an expanded event with its details
When the user clicks on the expanded event
Then the event collapses, hiding the extra details
