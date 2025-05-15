const express = require("express");
const router = express.Router();
const client = require("../lib/twilioClient");
const store = require("../utils/store");

router.post("/", async (req, res) => {
  const { customerCallSid, specialistNumbers } = req.body; // array of numbers
  const room = `conf_${Date.now()}`;
  store.set(room, { customerCallSid, specialistNumbers });

  const baseUrl = `https://${req.get("host")}`;
  const twimlDialUrl = `${baseUrl}/twiml-dial?room=${room}`;
  const callbackUrl = `${baseUrl}/status-callback?room=${room}`;

  await client.calls.create({
    to: process.env.TO_NUMBER, // Twilio requires a `to`, even if TwiML overrides it
    from: process.env.FROM_NUMBER,
    url: twimlDialUrl,
    statusCallback: callbackUrl,
    statusCallbackEvent: ['answered', 'completed'],
    statusCallbackMethod: 'POST'
  });

  res.json({ status: "Parallel call initiated", room });
});

module.exports = router;
