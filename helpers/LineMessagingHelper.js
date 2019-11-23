const request = require('request')

const token = 'some token'

this.reply = function (reply_token,answer) {
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
