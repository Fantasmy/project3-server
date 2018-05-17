'use strict';

const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');

const Bar = require('../models/bar');

router.get('/', (req, res, next) => {
  Bar.findById(req.session.currentUser._id)
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
    venue: req.body.venue,
    imgUrl: req.body.imgUrl,
    phone: req.body.phone,
    website: req.body.website,
    location: {
      street: req.body.location.street,
      strNumber: req.body.location.strNumber,
      postCode: req.body.location.postCode,
      city: req.body.location.city
    }
  };

  Bar.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({code: 'not-found'});
      }

      result.venue = newData.venue;
      result.imgUrl = newData.imgUrl;
      result.phone = newData.phone;
      result.website = newData.website;
      result.location = newData.location;
      // result.location.street = newData.location.street;
      // result.location.strNumber = newData.location.strNumber;
      // result.location.postCode = newData.location.postCode;
      // result.location.city = newData.location.city;

      result.save()
        .then(() => {
          res.json(result);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
