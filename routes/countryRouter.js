"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", getCountryList);
router.get("/code/:code", getCountryByCode);
router.get("/full/:name", getCountryByFullName);
router.get("/partial/:name", getCountriesByPartial);
router.get("/pics/:name", getCountryPics);

// Function to get full country list from API
async function getCountryList(req, res) {
  try {
    const countriesList = await axios("https://restcountries.eu/rest/v2/all");
    res.send(countriesList.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get country by an international ISO 2 or 3 digit code. Returnes a single object
async function getCountryByCode(req, res) {
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
async function getCountryByFullName(req, res) {
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
async function getCountriesByPartial(req, res) {
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

// Get pictures based on the country name (full) passed in
async function getCountryPics(req, res) {
  try {
    const searchName = req.params.name;
    const searchResult = await axios(
      `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API}&query=${searchName}`
    );
    const parsedData = searchResult.data.results.map((item) => {
      return {
        description: item.alt_description,
        url_small: item.urls.small,
        url_regular: item.urls.regular,
      };
    });
    res.send(parsedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
