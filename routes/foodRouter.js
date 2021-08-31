"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", getFoodList);
router.get("/code/:code", getFoodByCode);
router.get("/full/:name", getFoodByFullName);
router.get("/partial/:name", getFoodByPartialName);

// Function to get full country list from API
async function getFoodList(req, res) {
  try {
    // const countriesList = await axios("https://restcountries.eu/rest/v2/all");
    res.send("Get Food List");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get country by an international ISO 2 or 3 digit code. Returnes a single object
async function getFoodByCode(req, res) {
  try {
    const searchCode = req.params.code;
    const searchResult = await axios(
      `https://restcountries.eu/rest/v2/alpha/${searchCode}`
    );
    // console.log("By Code: ", searchResult.data);
    res.send(searchResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get country by full name matching
async function getFoodByFullName(req, res) {
  try {
    const searchName = req.params.name;
    const searchResult = await axios(
      `https://restcountries.eu/rest/v2/name/${searchName}?fullText=true`
    );
    res.send(searchResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get countries partial match of name. Returnes an array of objects.
async function getFoodByPartialName(req, res) {
  try {
    const searchName = req.params.name;
    const searchResult = await axios(
      `https://restcountries.eu/rest/v2/name/${searchName}`
    );
    // console.log("Partial: ", searchResult.data);
    res.send(searchResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
