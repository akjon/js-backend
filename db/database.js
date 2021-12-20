/**
 * Create the database connection
 */

const mongoose = require("mongoose");
let config;
let dsn;

if (process.env.NODE_ENV === 'test') {
  dsn = `mongodb://localhost/test`;
} else if (process.env.NODE_ENV === 'dev') {
  config = require("../config.json");
  dsn = `mongodb+srv://${config.username}:${config.password}@${config.clusterTest}`;
} else {
  config = require("../config.json");
  dsn = `mongodb+srv://${config.username}:${config.password}@${config.cluster}`;
}

mongoose.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
