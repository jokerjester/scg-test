const express = require('express')
const app = express()
const asm1 = require('./assignment1')
const api_helper = require('./helpers/APIhelper')
const status = require('http-status');

const  ggPlacrUri = 'https://maps.googleapis.com/maps/api/place/nearbysearch/'
const  respType = 'json'
const  ggKey = 'AIzaSyD00nvz4mUNbto6QrUaBmKYs2vXx_wrcbwหกฟกฟหกฟหก'

app.get('/ping', (req, res) => {
  res.send('Hello World')
})

// assignment1
app.get('/ans1', (req, res) => {
var arr = ["X", 5, 9, 15, 23, "Y", "Z"]
var ans1 = asm1.findXYZ(arr)
    res.send(ans1)
})

// assignment2
app.get('/ans2', (req, res) => {
    api_helper.makeAPIcall(ggPlacrUri.concat(respType).concat("?location=13.8234866,100.5081204&radius=1500&types=restaurant&key=").concat(ggKey))
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.status(status.INTERNAL_SERVER_ERROR).send(error)
    })
})

// assignment3
app.get('/webhooks', (req, res) => {
        res.sendStatus(200)
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});