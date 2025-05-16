const express = require("express");
const router = express.Router();
const client = require("../lib/twilioClient");
const store = require("../utils/store");

router.post("/", async (req, res) => {
  const callStatus = req.body.CallStatus;
  const room = req.query.room;

  console.log("📞 Specialist Call Status:", callStatus);

  if (callStatus === "answered") {
    const data = store.get(room);

    if (!data?.customerCallSid) {
      console.error("❌ No customer SID found for room:", room);
      return res.sendStatus(400);
    }

    try {
      await client.calls(data.customerCallSid).update({
        twiml: `<Response><Dial><Conference>${room}</Conference></Dial></Response>`
      });

      console.log("✅ Customer moved to conference room:", room);
    } catch (err) {
      console.error("❌ Failed to move customer to conference:", err.message);
    }
  }

  res.sendStatus(200);
});

module.exports = router;