var Article = require("../models/Article.js");

module.exports = function(app, db) {
  app.get("/", function(req, res) {
    Article.find({saved: false}, function(error, data) {
      var hbsObject = {
        article: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
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
