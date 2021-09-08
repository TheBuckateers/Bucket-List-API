'use strict';

const mongoose = require('mongoose');

const bucketListSchema = new mongoose.Schema({
  country: { type: Object, required: true },
  countryCode: { type: String, required: true },
  email: { type: String, required: true },
  note: { type: String},
})

const BucketListModel = mongoose.model('bucketList', bucketListSchema);

module.exports = BucketListModel;
