var Article = require("../models/Article.js")
var Note = require("../models/Note.js")

module.exports = function(app) {

// Route for saving/updating an Article's associated Note
app.post("/notes/save/:id", function(req, res) {
  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
  Note.create(req.body)
  .then(function(dbNote) {
    // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
    // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    return Article.findOneAndUpdate({_id: req.params.id}, { $push: { note: dbNote._id } });
  })
  .then(function(dbArticle) {
    // If the User was updated successfully, send it back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
  }); 
});
};