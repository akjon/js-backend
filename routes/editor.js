/**
 * Route functions for editor CRUD API
 */

const Doc = require("../models/Document");

// GET route
function getDocs(req, res) {
  let query = Doc.find({});

  query.exec((err, doc) => {
    if (err) {
      return res
        .send(err)
        .message("Not found")
        ;
    }
    return res.json(doc);
  });
}

// POST route
function postDoc(req, res) {
  let newDoc = new Doc(req.body);

  newDoc.save((err, doc) => {
    if (err) { return res.send(err); }
    return res.json({ message: "Document successfully added", doc });
  });
}

// GET document by _id
function getDoc(req, res) {
  Doc.findById(req.params.id, (err, doc) => {
    if (err) { return res.send(err); }
    return res.json(doc);
  });
}

// DELETE document by _id
function deleteDoc(req, res) {
  Doc.deleteOne({ _id: req.params.id }, (err, result) => {
    return res.json({ message: "Document successfully deleted", result });
  });
}

// PUT document by _id
function updateDoc(req, res) {
  Doc.findById({ _id: req.params.id }, (err, doc) => {
    if (err) { return res.send(err); }
    Object.assign(doc, req.body).save((err, doc) => {
      if (err) { return res.send(err); }
      return res.json({ message: "Document updated", doc });
    });
  });
}

module.exports = { getDocs, postDoc, getDoc, deleteDoc, updateDoc };
