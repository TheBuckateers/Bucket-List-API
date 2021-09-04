'use strict';

const mongoose = require('mongoose');

const bucketListSchema = new mongoose.Schema({
  countryCode: { type: String, required: true },
  countryName: { type: String, required: true },
  countryLat: { type: String, required: true },
  countryLon: { type: String, required: true },
  email: { type: String, required: true },
})

const BucketListModel = mongoose.model('bucketList', bucketListSchema);

module.exports = BucketListModel;
