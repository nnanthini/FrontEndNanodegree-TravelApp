var path = require('path')

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

app.get('/', function (req, res) {
    console.log(`Inside GET route..`)
    res.sendFile('dist/index.html')
})