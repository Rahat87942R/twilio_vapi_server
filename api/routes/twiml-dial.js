const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const store = require("../utils/store");

router.post("/", (req, res) => {
  const room = req.query.room;
  console.log("📞 /specialist-answer called for room:", room);

  const data = store.get(room);

  if (!data) {
    console.error("❌ No data found for room:", room);
    return res.status(404).send("No call data found.");
  }

  const specialistNumbers = data.specialistNumbers || [];
  console.log("📞 Calling specialist numbers:", specialistNumbers);

  const twiml = new twilio.twiml.VoiceResponse();
  const dial = twiml.dial({
    action: `/specialist-answer?room=${room}`,
    timeout: 20,
    answerOnBridge: true
  });

  specialistNumbers.forEach(number => {
    console.log("➡️ Dialing:", number);
    dial.number(number);
  });

  const twimlString = twiml.toString();
  console.log("📤 Responding with TwiML:", twimlString);

  res.type("text/xml").send(twimlString);
});

module.exports = router;