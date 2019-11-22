const express = require('express')
const app = express()
const asm1 = require('./assignment1')
const api_helper = require('./helpers/APIhelper')
const status = require('http-status');
const bodyParser = require('body-parser')
const request = require('request')
const mongoose = require('mongoose')
const Sample = require('./models/sample')

const  ggPlacrUri = 'https://maps.googleapis.com/maps/api/place/nearbysearch/'
const  respType = 'json'
const  ggKey = 'AIzaSyD00nvz4mUNbto6QrUaBmKYs2vXx_wrcbwหกฟกฟหกฟหก'

// connect to db
mongoose.connect('mongodb://jkd:p%40ssw0rd@ds211558.mlab.com:11558/heroku_vbrlvdjr')

// using parsers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// heath check
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
    api_helper.makeAPIcall(ggPlacrUri.concat(respType).concat("?location=13.8234866,100.5081204&radius=1500&types=restaurant&key=").concat(ggKey))
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.status(status.INTERNAL_SERVER_ERROR).send(error)
    })
})

// assignment3
const token = 'DNrLFw6H0xJ/iSkv0IdI6QnCVOD14pUX/ie0zZel0IHhapJAqb3xUSkI3XAUlx0wUiNSyV4KRGsLQ0irygjnSpNjyQeZhi+uZqzW1cMWAkOOEmKocHvOS/xw9mFVFXJez9GXfmWdaHouym0NYA9k4AdB04t89/1O/w1cDnyilFU='

app.post('/webhooks', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let question = req.body.events[0].message.text
    var answer = findAnswer(question)
    console.log(answer)
    reply(reply_token, answer)
    res.sendStatus(200)
})

function findAnswer(question) {
    Sample.findOne({keyword: question}).answer
}

app.post('/bot-samples', (req, res) => {
    const sample = new Sample(req.body)
    sample.save().then(() => console.log("sample is saved!"))
    res.send("sample is saved!")
})


function reply(reply_token,answer) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(token)
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: answer
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}


var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});