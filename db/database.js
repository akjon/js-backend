const mongoose = require("mongoose")

// let mongoDB = `mongodb://localhost:27017/test2`
let mongoDB = `mongodb://localhost:27017/test2`

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
