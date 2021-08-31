"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");
// const bucketListModel = require("../models/bucketList.js");
// const jwt = require("jsonwebtoken");
// const jwksClient = require("jwks-rsa");
// const client = jwksClient({
//   jwksUri: "https://dev-bqwezv2c.us.auth0.com/.well-known/jwks.json",
// });

router.get("/", getCountryList);
router.get("/:code", getCountryByCode);
router.get("/full/:name", getCountryByFullName);
router.get("/partial/:name", getCountriesByPartial);

// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     var signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }

// Function to get full country list from API
async function getCountryList(req, res) {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    // jwt.verify(token, getKey, {}, function (err, user) {
    //   if (err) {
    //     res.status(500).send("invlaid token");
    //   } else {
    //     BookModel.find({}, (err, dataBaseResults) => {
    //       if (err) {
    //         res.status(500).json({ message: err.message });
    //       } else {
    //         res.status(200).json(dataBaseResults);
    //       }
    //     });
    //   }
    // });
    const countriesList = await axios("https://restcountries.eu/rest/v2/all");
    res.send(countriesList.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get country by an ID number provided from API
async function getCountryByCode(req, res) {
  try {
    const searchCode = req.params.code;
    const searchResult = await axios(
      `https://restcountries.eu/rest/v2/alpha/${searchCode}`
    );
    console.log("By Code: ", searchResult.data);
    res.send(searchResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get country by full name matching
async function getCountryByFullName(req, res) {}

// Get countries partial match of name
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

module.exports = router;
