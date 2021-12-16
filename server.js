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
let config = require('./config.json');
const port = process.env.PORT || 1337;

let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(`mongodb+srv://${config.username}:${config.password}@${config.cluster}`);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", cors(), (req, res) => res.json({ message: "This is an editor API for a react-app using quilljs." }));

app.route("/editor")
  .get(editor.getDocs)
  .post(editor.postDoc);
app.route("/editor/:id")
  .get(editor.getDoc)
  .delete(editor.deleteDoc)
  .put(editor.updateDoc);

app.listen(port);
console.log(`Editor API listening on port ${port}`);

module.exports = app;
