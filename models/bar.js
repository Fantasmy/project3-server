'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barSchema = new Schema({
  barname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    street: {
      type: String,
      required: true
    },
    number: {
      type: String
    },
    postalCode: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point'
  //   },
  //   location: {
  //     type: {
  //       type: String
  //     },
  //     coordinates: [Number]
  //   }
  },
  phone: {
    type: Number
  },
  website: {
    type: String,
    required: false
  }
});

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;
