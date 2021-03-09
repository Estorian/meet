Feature: Specify Number of events

Scenario: When a user has not specified a number, 10 is the default number
Given The main page shows events from a city
When The user loads the list of events
Then ten events are loaded by default.

Scenario: User can change the number of events they want to see
Given the main page shows event from a city 
When the user inputs the number of events they want to see per page
Then the number of events on the page changes to match the number they input
