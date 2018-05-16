'use strict';

const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');

const Event = require('../models/event');

/* GET all the list  */
router.get('/', (req, res, next) => {
  Event.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

/* GET all the events by music type, changed name route to not get stuck at /:if  */
router.get('/by-type/:musicType', (req, res, next) => {
  Event.find({ musicType: req.params.musicType })
    .populate('bar')
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

// router.get('/search', (req, res, next) => {
//   const selectedMusic = req.body.musicType; // gets musicType key from the body
//   Event.find({musicType: selectedMusic}) // musicType from model of events
//     .populate('bar') // populate the bar: ObjectID with actual data, same bar as in the model of event
//     .then((result) => { // receives result, array of the rock event (and inside the populated info of bar)
//       const data = {
//         events: result
//       };
//       res.json(data); // converts data into string to send to main.js (front-end) => to response
//     })
//     .catch(next);
// });

router.post('/', (req, res, next) => {
  const imgUrl = req.body.imgUrl;
  const title = req.body.title;
  const date = req.body.date;
  const bar = req.session.currentUser._id;
  // const date = Number(req.body.date);
  // const time = Number(req.body.time);
  const musicType = req.body.musicType;
  const description = req.body.description;

  if (title === '' || musicType === '') { // missing date and time
    return res.status(422).json({ code: 'Unprocessable-entity' });
  }

  // const eventData = {
  //   imgUrl: req.body.imgUrl,
  //   title: req.body.title,
  //   bar: req.session.currentUser._id,
  // date: Number(req.body.date),
  // time: Number(req.body.time),
  //   musicType: req.body.musicType,
  //   description: req.body.description
  // };

  // const newEvent = new Event({ eventData });

  const newEvent = new Event({ imgUrl, title, date, musicType, description, bar });

  newEvent.save()
    .then((result) => {
      res.status(201).json({ code: 'okay' }); // status 201 = created
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  if (!mongooose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(422).json({code: 'unprocessale-entity'});
  }

  const newData = {
    imgUrl: req.body.imgUrl,
    title: req.body.title,
    // date: Date(req.body.date),
    // time: Number(req.body.time),
    // musicType: (req.body.musicType).toLowerCase(),
    musicType: req.body.musicType,
    description: req.body.description
  };

  // if there's no Event with this id
  Event.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({code: 'not-found'});
      }

      result.imgUrl = newData.imgUrl;
      result.title = newData.title;
      // result.date = newData.date;
      // result.time = newData.time;
      result.musicType = newData.musicType;
      result.description = newData.description;

      result.save()
        .then(() => {
          res.json(result);
        })
        .catch(next);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  if (!mongooose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(422).json({code: 'unprocessale-entity'});
  }

  Event.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({code: 'not-found'});
      }

      result.remove()
        .then(() => {
          res.json(result);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
