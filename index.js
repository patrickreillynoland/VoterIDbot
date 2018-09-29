const express = require('express');
const bodyParser = require('body-parser');
const messageWebhookController = require('./controllers/messageWebhook.js').default;
const verificationController = require('./controllers/verification.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', verificationController);
app.post('/', messageWebhookController);

app.listen(process.env.PORT || 3000);