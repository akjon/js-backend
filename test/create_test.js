"use strict";

const config = require("../config.json");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Document = require("../models/Documents")
const chai = require('chai');
const expect = chai.expect;
const Doc = Document

describe('Database Tests', function() {
  before(function(done) {
    mongoose.connect(`mongodb+srv://${config.username}:${config.password}@${config.cluster}`);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('Connected to test database!');
      done();
    });
  });

  describe('Test Database', function() {
    it('New doc saved to database', function(done) {
      let testDoc = Doc({
        _id: 'test_id',
        name: 'test_name',
        data: 'test_data'
      });

      testDoc.save(done);
    });

    it('Dont save incorrect format', function(done) {
      let wrongSave = Doc({
        notDoc: 'Not document'
      });
      wrongSave.save(err => {
        if (err) { return done(); }
        throw new Error('Should generate error!');
      });
    });

    it('Should retrieve doc by name', function(done) {
      Doc.findOne({ name: 'test_name' }, (err, name) => {
        if (err) { throw err; }
        if (name.length === 0) { throw new Error('No data!'); }
        done();
      });
    });

    it('Should retrieve doc by id', function(done) {
      Doc.find({ _id: 'test_id' }, (err, name) => {
        if (err) { throw err; }
        if (name.length === 0) { throw new Error('No data!'); }
        done();
      });
    });

    it('Delete test document', function(done) {
      Doc.deleteOne({ name: 'test_name' }, (err, name) => {
        if (err) { throw err; }
        if (name.length === 0) { throw new Error('No data!'); }
        done();
      });
    });
  });

  after(function(done) {
    Doc.deleteOne({ name: 'test_name' }, (err, name) => {
      if (err) { throw err; }
      if (name.length === 0) { throw new Error('No data!'); }
      done();
      mongoose.connection.close(done);
    });
  });
});
