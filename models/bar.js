'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const barSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: false
  },
  phone: {
    type: Number
  },
  website: {
    type: String,
    required: false
  },
  location: {
    street: {
      type: String,
      required: true
    },
    strNumber: {
      type: String
    },
    postCode: {
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
  }
});

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;
