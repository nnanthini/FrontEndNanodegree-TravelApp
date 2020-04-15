# Front End Nanodegree Capstone Project: Travel App

## About

Aim of the project is to build a Travel App.
User might input the destination and the start of travel date.
The app will show details(image, weather of the location entered).
The user can save trips.
The user can also delete trips (Optional functionality requirement for the project).
App runs on "https:/localhost:8000"

## Implementation

1. Destination entered by user is validated (only alphabets and single space allowed, this is specified in tooltip over the input field)
2. Date entered by user is validated (only next 16 dates are allowed (Limitation from Weatherbit API to render forecasts))
3. Asynchronous fetch calls are used to get data from API endpoints.
4. Information fetched from the API endpoints are stored in server.
5. Dynamic updation of the UI based on the information from the API's.

## Tests

1. Tests are done on both server and application.
2. They can be run by the script "npm run test".

