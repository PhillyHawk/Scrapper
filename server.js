//dependancies
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var express= require("express");
var axios = require("axios");


var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error){
  console.log("Database Error:", error);
});

app.get("/", function(req, res){
  res.send("Hello world");
});

app.get("/all", function(req, res){
  db.scrapedData.find({}, function(err, data){
  if(err) throw new err;

  res.json(data);
});
});



