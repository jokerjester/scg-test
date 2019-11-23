const status = require('http-status');

const ggPlacrUri = 'https://maps.googleapis.com/maps/api/place/nearbysearch/'
const respType = 'json'
const ggKey = 'AIzaSyD00nvz4mUNbto6QrUaBmKYs2vXx_wrcbw'

// import helpers
const apiHelper = require('../helpers/API_Helper')
const lineMsgHelper = require('../helpers/LineMessagingHelper')
// import service layer
const sampleService = require('../services/SampleService')
const asm1 = require('../services/assignment1')


// health check
this.ping = function(req, res) {
    res.send('OK')
}

// assignment1
this.ans1 = function(req, res) {
    var arr = ["X", 5, 9, 15, 23, "Y", "Z"]
    var ans1 = asm1.findXYZ(arr)
    res.status(status.OK).json({code:200, data: ans1})
}

// assignment2
this.ans2 = function(req, res) {
    // fix lat&long of Bang sue
    apiHelper.makeAPIcall(ggPlacrUri.concat(respType).concat("?location=13.8234866,100.5081204&radius=1500&types=restaurant&key=").concat(ggKey))
    .then(response => {
        res.status(status.OK).json({code: 200, resterants: response.results.map(result => result.name)})
    })
    .catch(error => {
        res.status(status.INTERNAL_SERVER_ERROR).json({code: 500, error: error})
    })
}

// assignment3
this.webhook = function(req, res) {
    let reply_token = req.body.events[0].replyToken
    let question = req.body.events[0].message.text
    sampleService.findAnswer(question).then(ans => {
        lineMsgHelper.reply(reply_token, (ans == null)? "I don't know what are you talking about" : ans.answer)
    })
    res.sendStatus(200)
}

this.getBotSamples = function(req, res, question) {
    //const { key } = req.params
    sampleService.findAnswer(question)
    .then(response => res.status(status.OK).json({code: 200, data: response}))
    .catch(error => res.status(status.INTERNAL_SERVER_ERROR).json({code: 500, error: error}))
}

this.teachBot = function(req, res) {
    sampleService.saveSample(req.body)
    .then(response => res.status(status.CREATED).json({code: 201, data: response}))
    .catch(error => res.status(status.INTERNAL_SERVER_ERROR).json({code: 500, error: error}))
}

