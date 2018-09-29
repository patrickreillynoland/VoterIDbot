module.exports = (req, res) => { 
    const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
    const hubChallenge = req.query["hub.challenge"];

    const hubMode = req.query["hub.mode"];
    const verifyTokenMechanics = (req.query["hub.verify_token"] === FB_VERIFY_TOKEN);

    if (hubMode && verifyTokenMechanics) {
        res.status(200).send(hubChallenge);
    } else {
        res.status(403).end();
    }
}
