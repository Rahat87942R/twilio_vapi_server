const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/", (req, res) => {
  const room = req.query.room;

  console.log("✅ /specialist-answer hit. Room:", room);

  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say("We have a customer for you. Please hold while we connect you.");
  twiml.dial().conference({
    startConferenceOnEnter: true,
    endConferenceOnExit: true
  }, room);

  console.log("📤 Responding with specialist join TwiML:", twiml.toString());

  res.type("text/xml").send(twiml.toString());
});

module.exports = router;
