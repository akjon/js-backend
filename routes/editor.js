/**
 * Routes for editor CRUD API
 */
'use strict';
const express = require('express');
const router = express.Router();
const Document = require('../models/Documents');

// Create
router.post('/editor', (req, res) => {
  const doc = new Document({
    _id: req.body._id,
    name: req.body.name,
    data: req.body.data
  });
  doc
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /editor",
        createdDocument: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Read
// Update
// Delete

module.exports = router;
