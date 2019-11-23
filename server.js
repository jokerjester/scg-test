const express = require('express')
const app = express()
const status = require('http-status');
const bodyParser = require('body-parser')
const ggPlacrUri = 'https://maps.googleapis.com/maps/api/place/nearbysearch/'
const respType = 'json'
const ggKey = 'AIzaSyD00nvz4mUNbto6QrUaBmKYs2vXx_wrcbw'

// import helpers
const apiHelper = require('./helpers/API_Helper')
const lineMsgHelper = require('./helpers/LineMessagingHelper')
// import service layer
const sampleService = require('./services/SampleService')
const asm1 = require('./services/assignment1')

// using parsers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// health check
app.get('/ping', (req, res) => {
    res.send('OK')
})

// assignment1
app.get('/ans1', (req, res) => {
var arr = ["X", 5, 9, 15, 23, "Y", "Z"]
var ans1 = asm1.findXYZ(arr)
    res.send(ans1)
})

// assignment2
app.get('/ans2', (req, res) => {
    apiHelper.makeAPIcall(ggPlacrUri.concat(respType).concat("?location=13.8234866,100.5081204&radius=1500&types=restaurant&key=").concat(ggKey))
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.status(status.INTERNAL_SERVER_ERROR).send(error)
    })
})

// assignment3
app.post('/webhooks', async (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let question = req.body.events[0].message.text
    console.log(question)
    let answer = sampleService.findAnswer(question).then(ans => {
        lineMsgHelper.reply(reply_token, (ans == null)? "I don't know what are you talking about" : ans.answer)
    })
    res.sendStatus(200)
})

app.get('/bot-samples/:question', async (req, res) => {
    const { question } = req.params
    sampleService.findAnswer(question)
    .then(response => res.json({code: 200, data: response}))
    .catch(error => res.json({code: 500}))
})

app.post('/bot-samples', async (req, res) => {
    sampleService.saveSample(req.body)
    .then(response => res.json({code: 201, data: response}))
    .catch(error => res.json({code: 500}))
})


var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});