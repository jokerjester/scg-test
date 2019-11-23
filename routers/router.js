const controller = require('../controllers/ScgController')
const express = require('express')
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')

// using parsers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.route('/ans1')
  .get(controller.ans1)

router.route('/ans2')
  .get(controller.ans2)

router.route('/teach-bot')
  .post(controller.teachBot);

router.route('/webhooks')
  .post(controller.webhook);

app.use('/api/v1', router);

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
module.exports = app;

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../docs/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);