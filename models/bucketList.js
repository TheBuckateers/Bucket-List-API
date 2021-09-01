"use strict";

const mongoose = require("mongoose");

const bucketListSchema = new mongoose.Schema({
  countryCode: { type: String, required: true },
  countryName: { type: String, required: true },
  countryLat: { type: String, required: true },
  countrLat: { type: String, required: true },
  email: { type: String, required: true },
});

const bucketListModel = mongoose.model("bucketList", bucketListSchema);

module.exports = bucketListModel;
