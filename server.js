//dependancies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var app = express();

var routes = require('./controller/routes');
var PORT = process.env.PORT || 3000;

// Initialize Express
// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Import routes and give the server access to them.

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapper"
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
