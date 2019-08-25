//dependancies
var express = require("express");
// var logger = require("morgan")
var mongoose = require("mongoose");

// var axios = require("axios");
// var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
// var db = require("./models");
var app = express();

var routes = require('./controller/routes');
var PORT = 3000;

// Initialize Express
// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Import routes and give the server access to them.

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/nprscraper", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
