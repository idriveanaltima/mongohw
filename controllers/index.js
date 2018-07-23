const request = require("request");
const cheerio = require('cheerio');

var Article = require("../models/Article.js")

module.exports = function(app) {
  app.get("/", function(req, res) {
    Article.find({saved: false}, function(error, data) {
      var hbsObject = {
        article: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("https://www.nytimes.com/", function(error, response, html) {
      var $ = cheerio.load(html);
      $("article h2").each(function(i, element) {
  
        // Save an empty result object
        var result = {};
        result.title = $(this).text();
        result.link = $(this).children("a").attr("href");

        var topResults = new Article(result)
        // Now, save that insert to the db
        topResults.save(function(err, doc) {
          // Log any errors
          if (err) {
            console.log(err);
          }
          // Or log the doc
          else {
            console.log(doc);
          }
        });
  
      });
          res.redirect("/");
  
    });

  });

  app.get("/saved", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    Article.find({"saved": true})
    .then(function(articles) {
      var hbsObject = {
        article: articles
      };
      // If all Users are successfully found, send them back to the client
      res.render("partials/items/saved", hbsObject);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
  });

  app.delete("/clear", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    Article.deleteMany({})
    .then(function(clear) {
      // If all Users are successfully found, send them back to the client
      res.json(clear);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
  });

}
