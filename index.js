const express = require('express');
const bodyParser = require('body-parser');
const messageWebhookController = require('./controllers/messageWebhook.js');
const verificationController = require('./controllers/verification.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000);

app.get('/', verificationController);
app.post('/', messageWebhookController);

