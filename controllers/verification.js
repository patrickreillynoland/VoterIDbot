module.exports = (req, res) => { 
    const hubChallenge = req.query["hub.challenge"];

    const hubMode = req.query["hub.mode"];
    const verifyTokenMechanics = (req.query["hub.verify_token"] === "mitchell4congress");

    if (hubMode && verifyTokenMechanics) {
        res.status(200).send(hubChallenge);
    } else {
        res.status(403).end();
    }
}
