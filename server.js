/**
 * Server for CRUD API
 */

let editor = require("./routes/editor.js");
let express = require("express");
let cors = require("cors");
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let database = require("./db/database");
const port = process.env.PORT || 1337;


if (process.env.NODE_ENV === "test") {
  console.info(`Starting express with env var: ${process.env.NODE_ENV}`)
} else {
  app.use(morgan("combined"));
}


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", cors(), (req, res) => res.json({
  message: "This is an editor API for a react-app using quilljs."
}));

app.route("/editor")
  .get(editor.getDocs)
  .post(editor.postDoc);
app.route("/editor/:id")
  .get(editor.getDoc)
  .delete(editor.deleteDoc)
  .put(editor.updateDoc);

app.listen(port);
console.log(`Editor API listening on port ${port}`);

app.use((req, res, next) => {
  let err = new Error("Not Found");

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    errors: [
      {
        status: err.status,
        message: err.message
      }
    ]
  });
});
module.exports = app;
