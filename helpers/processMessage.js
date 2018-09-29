const APIAI_TOKEN = "3806a234537d4910a45ce264a5ec7586";
const apiaiClient = require('apiai')(APIAI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = "EAAHvoZA36ZBAABAKOtyQH8PXdpTxGlgfPbyMWpTH9R2XR8AXx7i8fwz0F0D8Jg66PAQpp41XsPPdTRC1uTjzo96wPlCZB5azcOvzxZBTSthGsFZAsirPM1I1aOvmdILFwx529VYGAKHUpQ5ZBC0qUM1EqsamZCPEZBZA8T6stIcWtKgZDZD";
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