"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", getAdvisoryList);
router.get("/:id", getAdvisoryById);

// Function to get all travel advisories list from API
async function getAdvisoryList(req, res) {
  try {
    const advisoryListResult = await axios(
      "https://www.travel-advisory.info/api"
    );
    res.send(advisoryListResult.data.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get single country travel advisory using the 2 digit ISO country code
async function getAdvisoryById(req, res) {
  try {
    const searchCode = req.params.id;
    const searchResult = await axios(
      `https://www.travel-advisory.info/api?countrycode=${searchCode}`
    );

    res.send(searchResult.data.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
