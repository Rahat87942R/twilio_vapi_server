require("dotenv").config();
const express = require("express");
const app = require("./api"); // Assuming all routes are in /api/index.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
