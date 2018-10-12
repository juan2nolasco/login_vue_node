const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Book');

const passport = require('passport');
require('../config/passport')(passport);

/* GET ALL BOOKS */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
   const token = getToken(req.headers);
   if (token) {
      Book.find(function (err, books) {
         if (err) return next(err);
         res.json(books);
      });
   } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.'});
   }
});

/* GET A SINGLE BOOK BY ID*/
router.get('/:id', (req, res, next) => {
   Book.findById(req.params.id, function (err, post){
      if (err) return next(err);
      res.json(post);
   });
});

/* SAVE BOOK */
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
   const token = getToken(req.headers);
   if (token) {
      Book.create(req.body, function (err, post) {
         if (err) return next(err);
         res.json(post);
      });
   } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.'});
   }
});
/* UPDATE BOOK */
router.put('/:id', (req, res, next) => {
   Book.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
   });
});

/* DELETE BOOK */
router.delete('/:id', (req, res, next) => {
   Book.findByIdAndRemove(req.params.id, req.body, (err, post) => {
      if (err) return next(err);
      res.json(post);
   });
});

getToken = function (headers) {
   if (headers && headers.authorization) {
      const parted = headers.authorization.split(' ');
      if (parted.length === 2) {
         return parted[1];
      } else {
         return null;
      }
   } else {
      return null;
   }
};


module.exports = router;