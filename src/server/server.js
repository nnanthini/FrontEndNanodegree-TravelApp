const dotenv = require('dotenv');
dotenv.config();

var path = require('path')

const fetch = require('node-fetch')

const express = require('express')
const app = express()
app.use(express.static('dist'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors =  require('cors')
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

console.log(__dirname)

app.listen(8000, function () {
    console.log('Server listening on localhost:8000');
})

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

app.get('/', function (request, result) {
    console.log(`Inside GET route..`)
    result.sendFile('dist/index.html')
})

let contentInfo = {
    daysLeft: 99,
    locationInfo: {},
    imgInfo: {},
    weatherInfoCurrent: {},
    weatherInfoFuture: {}
  };

function updateContent(key, value) {
    contentInfo[key] = value;
    console.log(`Content Info is `)
    for (let content in contentInfo) {
        console.log(content, contentInfo[content]);
      }
}

app.post('/updateContent', cors(), function (req, res) {
    console.log(`Inside POST route for /updateContent..... diffInDays`)
    console.log(req.body.diffInDays)
    updateContent('daysLeft', req.body.diffInDays)
    res.send(`diffInDays received`);
      
})

app.post('/destinationDetails', cors(), function (request, response) {
    console.log(`Inside POST route /destinationDetails (Geonames API call).. 
    User input location is.. `)
    console.log(request.body.location)
    let url = `http://api.geonames.org/searchJSON?&q=${request.body.location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`
    
    const getData = async url => {
        try {
          console.log(`URL for Geonames API... 
          ${url}`)
          const res = await fetch(url);
          await sleep(200);
          const json = await res.json();
          const locInfo = {
            latitude: json.geonames[0].lat,
            longitude: json.geonames[0].lng,
            administration: json.geonames[0].adminName1,
            country: json.geonames[0].countryName
          }
          updateContent('locationInfo', locInfo);
          response.send(locInfo);
        } catch (error) {
          console.log(error);
          response.send(error);
        }
      };      
      getData(url);
})

app.post('/imageDetails', cors(), function (request, response) {
    console.log(`Inside POST route /imageDetails (Pixabay API call).. 
    User input location is.. `)
    console.log(request.body.locationImg)
    console.log(`Country is..`)
    console.log(request.body.countryImg)
    let url = ``
    const getData = async url => {
        try {
            await sleep(400);
            let locationInUrl = `${request.body.locationImg}`.replace(' ','+');
            console.log(locationInUrl)
            url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${locationInUrl}&image_type=photo&category=places&per_page=3`
            console.log(`URL for Pixabay API... 
            ${url}`)
          const res = await fetch(url);
          const json = await res.json();
          const imgInfo = {
              imgURL: json.hits[0].webformatURL,
              imgWidth: json.hits[0].webformatWidth,
              imgHeight: json.hits[0].webformatHeight
          }
          updateContent('imgInfo', imgInfo);
          response.send(imgInfo);
        } catch (error) {
          console.log(error);
          response.send(error);
        }
      };      
      getData(url);
})

app.post('/weatherDetails', cors(), function (request, response) {
    console.log(`Inside POST route /weatherDetails (WeatherBit API call).. 
    User input location is.. `)
    console.log(request.body.locationWeather)
    console.log(`Latitude is..`)
    console.log(request.body.latitudeWeather)
    console.log(`Longitude is..`)
    console.log(request.body.longitudeWeather)
    let url = ``;
    const getData = async url => {
        try {
            await sleep(500);
            console.log(`Before weatherbit fetch call slept for 2000`)
            console.log(`$$$$ Output from Weatherbit API $$$$`)
            if(contentInfo.daysLeft === 0) {
                url = `http://api.weatherbit.io/v2.0/current?&lat=${contentInfo.locationInfo.latitude}&lon=${contentInfo.locationInfo.longitude}&key=${process.env.WEATHERBIT_KEY}`
                console.log(`URL for Weatherbit API... 
                ${url}`)
                const res = await fetch(url);
                const json = await res.json();
                const currentWeather = {
                    count: 0,
                    timeZone: json.data[0].timezone,
                    windSpeed: json.data[0].wind_spd,
                    sunRise: json.data[0].sunrise,
                    sunSet: json.data[0].sunset,
                    weather: json.data[0].weather.description,
                    temperature: json.data[0].temp,
                    feelsLikeTemperature: json.data[0].app_temp
                }
                updateContent('weatherInfoCurrent', currentWeather)
                updateContent('weatherInfoFuture', {})
                response.send(currentWeather)

            }else {
                url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${contentInfo.locationInfo.latitude}&lon=${contentInfo.locationInfo.longitude}&key=${process.env.WEATHERBIT_KEY}`
                console.log(`URL for Weatherbit API... 
                ${url}`)
                const res = await fetch(url);
                const json = await res.json();
                const predictedWeather = {
                    count: 16,
                    weatherForecastFuture: json
                };
                updateContent('weatherInfoCurrent', {})
                updateContent('weatherInfoFuture', predictedWeather)
                response.send(predictedWeather)
            }
        } catch (error) {
          console.log(error);
          response.send(error);
        }
      };      
      getData(url);
})
