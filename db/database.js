/**
 * Create the database connection
 */

const mongoose = require("mongoose");
const config = require("../config.json");

// let options = {
//   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
// };


let mongoDB = `mongodb+srv://${config.username}:${config.password}@${config.cluster}`;

if (process.env.NODE_ENV === "test") {
  let mongoDB = `mongodb+srv://${config.username}:${config.password}@${config.clusterTest}`;
}

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
