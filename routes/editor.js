/**
 * Routes for editor CRUD API
 */

let mongoose = require('mongoose');
let Doc = require('../models/Document');

// GET route
function getDocs(req, res) {
  let query = Doc.find({});
  query.exec((err, books) => {
    if (err) res.send(err);
    res.json(books);
  });
}

// POST route
function postDoc(req, res) {
  var newDoc = new Doc(req.body);
  newDoc.save((err, doc) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json({ message: "Document successfully added", doc });
    }
  });
}

// GET document by _id
function getDoc(req, res) {
  Doc.findById(req.params.id, (err, doc) => {
    if (err) res.send(err);
    res.json(doc);
  });
}

// DELETE document by _id
function deleteDoc(req, res) {
  Doc.deleteOne({ _id: req.params.id }, (err, result) => {
    res.json({ message: "Document successfully deleted", result });
  });
}

// PUT document by _id
function updateDoc(req, res) {
  Doc.findById({ _id: req.params.id }, (err, doc) => {
    if (err) res.send(err);
    Object.assign(doc, req.body).save((err, doc) => {
      if (err) res.send(err);
      res.json({ message: 'Document updated', doc });
    });
  });
}

module.exports = { getDocs, postDoc, getDoc, deleteDoc, updateDoc };
