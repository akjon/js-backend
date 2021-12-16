const { Schema, model } = require("mongoose");

const Document = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  data: { type: Object },
  creationDate: { type: Date, default: Date.now }
});

Document.pre('save', next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = model("Document", Document);
