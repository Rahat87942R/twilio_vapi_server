const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/", (req, res) => {
  const room = req.query.room;
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("We have a customer for you. Joining the conference now.");
  twiml.dial().conference(room);

  res.type("text/xml").send(twiml.toString());
});

module.exports = router;
