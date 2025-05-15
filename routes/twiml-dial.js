const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const store = require("../utils/store");

router.post("/", (req, res) => {
  const room = req.query.room;
  const data = store.get(room);

  const specialistNumbers = data?.specialistNumbers || [];

  const twiml = new twilio.twiml.VoiceResponse();
  const dial = twiml.dial({
    action: `/specialist-answer?room=${room}`,
    timeout: 20,
    answerOnBridge: true
  });

  specialistNumbers.forEach(number => {
    dial.number(number);
  });

  res.type("text/xml").send(twiml.toString());
});

module.exports = router;