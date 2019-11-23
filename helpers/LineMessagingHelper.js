const request = require('request')

const token = 'DNrLFw6H0xJ/iSkv0IdI6QnCVOD14pUX/ie0zZel0IHhapJAqb3xUSkI3XAUlx0wUiNSyV4KRGsLQ0irygjnSpNjyQeZhi+uZqzW1cMWAkOOEmKocHvOS/xw9mFVFXJez9GXfmWdaHouym0NYA9k4AdB04t89/1O/w1cDnyilFU='

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