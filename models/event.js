'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema({
  imgUrl: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  // date: {
  //   type: Number
  // },
  // time: {
  //   type: Number // Time??????
  // },
  musicType: {
    type: String,
    enum: ['classic', 'folklore', 'jazz', 'other', 'pop', 'rap', 'rock'],
    required: true
  },
  description: {
    type: String,
    required: false
  },
  bar: {
    type: ObjectId,
    ref: 'Bar'
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
