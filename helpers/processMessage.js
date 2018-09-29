const APIAI_TOKEN = "3806a234537d4910a45ce264a5ec7586";
const apiaiClient = require('apiai')(APIAI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = "EAAHvoZA36ZBAABAIzHZA8qbNZB7WSdBRAbnmio3OIk1b1pYVUyszdfQ7Qx9Tuf5B85VM811oH15JrZBbY3hUoXUZB3Ek1r6QftmbZAcwjplair39HSF7cpSSH6ZBYmJ7JF9Mihv8SKkeD4mIq8RFn0cKPzQkxuWOw3HuIECwK3SXMQZDZD";
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