'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const Bar = require('../models/bar');

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({code: 'not-found'});
  }
});

// router.get('/:id', (req, res, next) => {
//   Bar.findById(req.params.id)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch(next);
// });

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({code: 'unauthorized'});
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({code: 'validation'});
  }

  Bar.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({code: 'not-found'});
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(404).json({code: 'not-found'});
      }
      req.session.currentUser = user;
      return res.json(user);
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({code: 'unauthorized'});
  }
  const username = req.body.username;
  const password = req.body.password;
  const venue = req.body.venue;
  const imgUrl = req.body.imgUrl;
  const phone = req.body.phone;
  const website = req.body.website;
  const location = {
    street: req.body.location.street,
    strNumber: req.body.location.strNumber,
    postCode: req.body.location.postCode,
    city: req.body.location.city

  };

  if (!username || !password) {
    return res.status(422).json({code: 'validation'});
  }

  Bar.findOne({username}, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({code: 'username-not-unique'});
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = Bar({
        username,
        password: hashPass,
        venue,
        imgUrl,
        phone,
        website,
        location
      });

      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser; // automatically logged in
          res.json(newUser);
        });
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

module.exports = router;
