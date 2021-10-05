const mongoose = require("mongoose")
const config = require("../config.json")

// let mongoDB = `mongodb://localhost:27017/test2`
let mongoDB = `mongodb+srv://${config.username}:${config.password}@cluster0.g5oex.mongodb.net/editor?retryWrites=true&w=majority`

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
