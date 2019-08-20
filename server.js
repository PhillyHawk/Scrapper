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


app.get("/scrape", function(req, res){
  axios.get("https://www.rollingstone.com/music/").then(function(response){
    var $ = cheerio.load(response.data);

    $(".c-card").each(function(i, element){
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");

      db.scrapedData.insert({
        title: title,
        link: link
      }, function(err, data){
        if(err) throw new err;
      });
    });
  });
});
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
