"use strict";

process.env.NODE_ENV = "test";
let config = require("../config.json");
let mongoose = require("mongoose");
let Document = require("../models/Document");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing editor API", () => {
  beforeEach((done) => {
    Document.deleteMany({}, () => {
      done();
    });
  });
  describe("Testing /GET route", () => {
    it("it should GET all documents", (done) => {
      chai
        .request(server)
        .get("/editor")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it("it should GET a document by id", (done) => {
      let doc = new Document({
        _id: "test_get_by_id",
        name: "test_get_by_id",
        data: "test_data"
      });

      doc.save((err, doc) => {
        chai
          .request(server)
          .get("/editor/" + doc._id)
          .send(doc)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name");
            res.body.should.have.property("data");
            res.body.should.have.property("_id").eql(doc._id);
            done();
          });
      });
    });

    it("it should GET 404 error if route doesn't exist", (done) => {
      chai
        .request(server)
        .get("/nonexistin_route")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("Testing /POST route", () => {
    it("it should POST a document ", (done) => {
      chai
        .request(server)
        .post("/editor")
        .send({
          _id: "test_id",
          name: "test_name"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("Document successfully added");
          done();
        });
    });

    it("it should not POST a document with no name", (done) => {
      let doc = {
        _id: "test_id"
      };

      chai
        .request(server)
        .post("/editor")
        .send(doc)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("name");
          res.body.errors.name.should.have.property("kind").eql("required");
          done();
        });
    });
  });

  describe("Testing /PUT/:id route", () => {
    it("it should UPDATE a document by id", (done) => {
      let doc = new Document({
        _id: "test_id",
        name: "test_id",
        data: "test_data"
      });

      doc.save((err, doc) => {
        chai
          .request(server)
          .put("/editor/" + doc._id)
          .send({ _id: doc._id, name: doc.name, data: "test_data_updated" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Document updated");
            res.body.doc.should.have.property("name");
            res.body.doc.should.have.property("data");
            res.body.doc.should.have.property("data").eql("test_data_updated");
            done();
          });
      });
    });
  });

  describe("Testing /DELETE/:id route", () => {
    it("it should DELETE a document by id", (done) => {
      let doc = new Document({
        _id: "test_update_by_id",
        name: "test_update_by_id",
        data: "test_data"
      });

      doc.save((err, doc) => {
        chai
          .request(server)
          .delete("/editor/" + doc._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Document successfully deleted");
            res.body.result.should.have.property("deletedCount").eql(1);
            done();
          });
      });
    });
  });

  after(function(done) {
    Document.deleteOne({ name: "test_get_by_id" }, (err, name) => {
      if (err) {
        throw err;
      }
      if (name.length === 0) {
        throw new Error("No data!");
      }
      done();
      mongoose.connection.close(done);
    });
  });
});
