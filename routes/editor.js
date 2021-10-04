/**
 * Routes for editor CRUD API
 */
'use strict';
const express = require('express');
const router = express.Router();
// const mongoose = require("mongoose");
const Document = require('../models/Documents');

// Create
router.post('/editor', (req, res) => {
  console.log(req.body)
  const doc = new Document({
    _id: req.body._id,
    name: req.body.name,
    data: req.body.data
  });
  doc
    .save()
    .then(data => {
      res.status(201).json({
        message: "Handling POST requests to /editor",
        createdDocument: data
      });
    })
});

// Read all
router.get("/editor", (req, res, next) => {
  Document.find()
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
});

// Update one
router.put("/editor/:documentId", (req, res, next) => {
  const id = { _id: req.params.documentId }
  console.log(id)
  Document.updateOne(id, req.body)
    .exec()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
});

// Delete


module.exports = router;
