var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

var databaseUrl = "mongodb://localhost/newsScraper";

if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else{
  mongoose.connect(databaseUrl);
}

app.get("/scrape", function(req, res) {
   
  axios.get("https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page").then(function(response) {
     
    var $ = cheerio.load(response.data);
      
    $("article.story").each(function(i, element) {
      
      var article = {};

      article.Headline = $(element).find("h2.headline").find("a").text();
      article.link = $(element).find("h2.headline").find("a").attr("href");
      article.Summary = $(element).find("p.summary").text();
      console.log(article);
      db.Article.create(article).then(function(dbArticle) {
          console.log(dbArticle);
      }).catch(function(err) {
          return res.json(err);
      });
    });

    res.send("Scrape Complete");

  });
});


app.get("/articles", function(req, res) {
  
  db.Article.find({}).sort({_id: -1}).limit(30).then(function(dbArticle) {

    res.json(dbArticle);

  }).catch(function(err) {

    res.json(err);

  });
});

app.get("/articles/:id", function(req, res) {
  
  db.Article.findOne({ _id: req.params.id }).populate("Comments").then(function(dbArticle) {

      res.json(dbArticle);

  }).catch(function(err) {

    res.json(err);

  });
});

app.post("/articles/:id", function(req, res) {
  
  db.Comments.create(req.body).then(function(dbComments) {
    return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push:{Comments: dbComments._id}}, { new: true });
  }).then(function(dbArticle) {
      res.json(dbArticle);
  }).catch(function(err) {
      res.json(err);
  });
});

app.get("/", function(req, res){
  res.load("./index.html");
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
