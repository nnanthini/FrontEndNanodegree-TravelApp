function eventListeners() {
    
    let formElement = document.getElementById('form');
    formElement.addEventListener('submit', handleFormSubmit);
    console.log(`Added submit event listener to form element`);
    
    function handleFormSubmit(event) {
        event.preventDefault();

        Client.contentClear();
        
        console.log(`Inside form event handler function..`);
        let destination = document.getElementById('location').value;
        console.log(`Destination: ${destination}`);
        let date = document.getElementById('start-date').value;
        console.log(`Date: ${date}`);

        let postCallCheck = true;

        // If input destination is not a valid string, then alerts user.
        if (!Client.destinationValidator(destination)) {
            alert("Enter a valid destination")
            // Prevents call to server if destination is not valid.
            postCallCheck = false;
        }

        // If input date is not a future date, then alerts user.
        if (!Client.dateValidator(date)) {
            alert("Enter a valid date")
            // Prevents call to server if date is not valid.
            postCallCheck = false;
        }

        let locInfo = {}
        let imgInfo = {}
        let weatherInfoCurrent = {}
        let weatherInfoFuture = {}

        // Fetch is called only if both destination and date entered by user is valid
        if(postCallCheck) {

            //Getting destination details
            fetch('http://localhost:8000/destinationDetails', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: destination })
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(`Result from server for POST call 'http://localhost:8000/destinationDetails'`)
                console.log(res);
                locInfo = {
                    place : destination,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    administration: res.administration,
                    country: res.country
                }
                if(locInfo.latitude === undefined) {
                    alert('Enter valid destination')
                    return;

                }else {
                    Client.contentAppend('locationInfo', locInfo)
                }
                
            })

            //Getting image details
            fetch('http://localhost:8000/imageDetails', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ locationImg : destination, countryImg: locInfo.country })
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(`Result from server for POST call 'http://localhost:8000/imageDetails'`)
                console.log(res);
                imgInfo = {
                    imgURL: res.imgURL,
                    imgWidth: res.imgWidth,
                    imgHeight: res.imgHeight
                }
                Client.contentAppend('imgInfo', imgInfo)
            })


            //Get weather details
            fetch('http://localhost:8000/weatherDetails', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ locationWeather : destination, latitudeWeather: locInfo.latitutde, longitudeWeather: locInfo.longitude })
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(`Result from server for POST call 'http://localhost:8000/weatherDetails'`)
                console.log(res);                

                if(res.count === 0) {
                    weatherInfoCurrent = {
                        timeZone: res.timeZone,
                        windSpeed: res.windSpeed,
                        sunRise: res.sunRise,
                        sunSet: res.sunSet,
                        weather: res.weather,
                        temperature: res.temperature,
                        feelsLikeTemperature: res.feelsLikeTemperature
                    }
                    Client.contentAppend('weatherInfoCurrent', weatherInfoCurrent)

                }else {
                    weatherInfoFuture = {
                        weatherForecastFuture: res.weatherForecastFuture
                    }
                    Client.contentAppend('weatherInfoFuture', weatherInfoFuture)
                }               
                
            })

        }
        
    }
    
}

export { eventListeners }
