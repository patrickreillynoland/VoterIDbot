/*The old tokens are dead, don't even try it.*/

const APIAI_TOKEN = process.env.APIAI_TOKEN;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const apiaiClient = require('apiai')(APIAI_TOKEN);
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
   };

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiaiClient.textRequest(message, {sessionId: 'VoterIDBot'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
   };