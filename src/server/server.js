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

app.post('/test', cors(), function (req, res) {
    console.log(`Inside POST route for /test`)
    let data = {
        lat: 89,
        long: 90,
        country: 'India'
    }
    res.send(data);
      
})

let contentInfo = {
    daysLeft: 0,
    locationInfo: {},
    imgInfo: {}
  };

app.post('/destinationDetails', cors(), function (request, response) {
    console.log(`Inside POST route /destinationDetails`)
    console.log(request.body.location)
    console.log(`$$$$ Output from Geonames API $$$$`)
    let url = `http://api.geonames.org/searchJSON?&q=${request.body.location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`
    const getData = async url => {
        try {
          const res = await fetch(url);
          await sleep(1000);
          const json = await res.json();
          console.log(json)
          const locInfo = {
            latitude: json.geonames[0].lat,
            longitude: json.geonames[0].lng,
            administration: json.geonames[0].adminName1,
            country: json.geonames[0].countryName
          }
          contentInfo.locationInfo = locInfo;
          console.log(`Content updated after geonames call `)
            for (let content in contentInfo) {
                console.log(content, contentInfo[content]);
            }
          console.log(locInfo);
          response.send(locInfo);
        } catch (error) {
          console.log(error);
          response.send(error);
        }
      };      
      getData(url);
})




app.post('/imageDetails', cors(), function (request, response) {
    console.log(`Inside POST route /imageDetails`)
    console.log(request.body.locationImg)
    console.log(request.body.countryImg)
    let url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=las+vegas&image_type=photo&category=places&per_page=3`
    const getData = async url => {
        try {
            await sleep(2000);
            console.log(`Before pixa fetch call slept for 2000`)
            console.log(`$$$$ Output from Pixabay API $$$$`)
            //console.log(`${contentInfo.locationInfo.administration}
            //${contentInfo.locationInfo.country}`)
            let locationInUrl = `${request.body.locationImg}`.replace(' ','+');
            console.log(locationInUrl)
            //var str2 = `${contentInfo.locationInfo.administration}`.replace(' ','+');
            //var str3 = `$${contentInfo.locationInfo.country}`.replace(' ','+')
            //console.log(str2)
            //console.log(str3)
            url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${locationInUrl}&image_type=photo&category=places&per_page=3`
          const res = await fetch(url);
          const json = await res.json();
          
          console.log(json)
          const imgInfo = {
              imgURL: json.hits[0].webformatURL,
              imgWidth: json.hits[0].webformatWidth,
              imgHeight: json.hits[0].webformatHeight
          }
          console.log(imgInfo);
          response.send(imgInfo);
        } catch (error) {
          console.log(error);
          response.send(error);
        }
      };
      
      getData(url);

})

