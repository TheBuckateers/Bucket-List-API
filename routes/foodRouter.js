"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", getFoodList);
router.get("/areas", listFoodAreas);
router.get("/areas/:area", listFoodsByArea);
router.get("/categories", listFoodCategories);
router.get("/:id", getFoodById);

// Function to get 1 random meal recipe
async function getFoodList(req, res) {
  try {
    const listRandomMeal = await axios(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    res.send(listRandomMeal.data.meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a meal by the meal ID number
async function getFoodById(req, res) {
  try {
    const searchCode = req.params.id;
    const searchResult = await axios(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchCode}`
    );
    res.send(searchResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function listFoodsByArea(req, res) {
  try {
    const searchArea = req.params.area;
    const searchResult = await axios(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchArea}`
    );
    res.send(searchResult.data.meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// List all food areas available
async function listFoodAreas(req, res) {
  try {
    const searchResult = await axios(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    res.send(searchResult.data.meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// List all food categories available
async function listFoodCategories(req, res) {
  try {
    const searchResult = await axios(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    res.send(searchResult.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
