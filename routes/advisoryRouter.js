"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", getAdvisoryList);
router.get("/:id", getAdvisoryById);

// Function to get full country list from API
async function getAdvisoryList(req, res) {
  try {
    const advisoryListResult = await axios(
      "https://www.travel-advisory.info/api"
    );
    res.send(advisoryListResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get country by an international ISO 2 or 3 digit code. Returnes a single object
async function getAdvisoryById(req, res) {
  try {
    const searchCode = req.params.id;
    const searchResult = await axios(
      `https://www.travel-advisory.info/api?countrycode=${searchCode}`
    );

    res.send(searchResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
