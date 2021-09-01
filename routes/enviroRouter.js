"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", getEnviroInfo);


// Get single country environment and weather info
async function getEnviroInfo(req, res) {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const searchResult = await axios(
      `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.AIRVISUAL_API}`
    );

    res.send(searchResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;