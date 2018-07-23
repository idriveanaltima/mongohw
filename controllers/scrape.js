const request = require("request");
const cheerio = require('cheerio');

var Article = require("../models/Article.js")

module.exports =  function(app) {

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
  };