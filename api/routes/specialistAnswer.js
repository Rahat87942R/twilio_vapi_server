const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/", (req, res) => {
  const room = req.query.room;
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  // Remove "say" to avoid conflict
  twiml.dial().conference({
    startConferenceOnEnter: true,
    endConferenceOnExit: true
  }, room);

  res.type("text/xml").send(twiml.toString());
});

module.exports = router;