const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const status = req.body.CallStatus;
  console.log("Specialist Call Status:", status);
  res.sendStatus(200);
});

module.exports = router;
