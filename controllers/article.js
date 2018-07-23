var Article = require("../models/Article.js");

module.exports = function(app) {

app.put("/save/:id", function(req, res) {

  Article.update({_id: req.params.id}, {$set: {saved: true}})
  .then(function(dbArticle) {

    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});
 
app.put("/remove/:id", function(req, res) {
 
  Article.update({_id: req.params.id}, {$set: {saved: false}})
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});

};