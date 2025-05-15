const express = require("express");
const bodyParser = require("body-parser");

const initiate = require("../routes/initiate");
const specialistAnswer = require("../routes/specialistAnswer");
const statusCallback = require("../routes/statusCallback");
const customerConference = require("../routes/customerConference");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/initiate", initiate);
app.use("/specialist-answer", specialistAnswer);
app.use("/status-callback", statusCallback);
app.use("/customer-conference", customerConference);

module.exports = app;
