'use strict';

const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');

const Event = require('../models/event');

/* GET home page. */
// router.get('/', (req, res, next) => {
//   Event.find({})
//     .then((result) => {
//       res.json(result);
//     })
//     .catch(next);
// });

router.post('/', (req, res, next) => {
  const title = req.body.title;
  // const date = Number(req.body.date);
  // const time = Number(req.body.time);
  const musicType = req.body.musicType;
  const description = req.body.description;

  if (title === '' || musicType === '') { // missing date and time
    return res.status(422).json({ code: 'Unprocessable-entity' });
  }

  // check if the name is already in use
  // Event.findOne({title: title})
  // .then(result => {
  //   if (result) {
  //     return res.status(401).json({code: 'tite already in use'});
  //   }
  // })

  const newEvent = new Event({ title, musicType, description });

  newEvent.save()
    .then((result) => {
      res.status(201).json({ code: 'okay' }); // status 201 = created
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

router.put('/:id', (req, res, next) => {
  if (!mongooose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(422).json({code: 'unprocessale-entity'});
  }

  const newData = {
    title: req.body.title,
    date: Date(req.body.date),
    time: Number(req.body.time),
    // musicType: (req.body.musicType).toLowerCase(),
    musicType: req.body.musicType,
    description: req.body.description
  };

  const options = {
    new: true
  };

  // if there's no Event with this id
  Event.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({code: 'not-found'});
      }

      result.title = newData.title;
      result.date = newData.date;
      result.time = newData.time;
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
