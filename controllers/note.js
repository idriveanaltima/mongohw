var Article = require("../models/Article.js")
var Note = require("../models/Note.js")

module.exports = function(app) {

// Route for saving/updating an Article's associated Note
app.post("/notes/save/:id", function(req, res) {

console.log(req.body)
  console.log(req.body.id)
  let notes = {};
        notes.text = req.body.text;
        const note = new Note(notes)


  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
  Note.create(note)
  .then(function(dbNote) {
    console.log(dbNote)
    console.log(req.params.id)
    // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
    // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    return Article.findOneAndUpdate({_id: req.params.id}, { $push: { notes: dbNote._id } }, { new: true });
  })
  .then(function(dbArticle) {
    console.log(dbArticle)
    // If the User was updated successfully, send it back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, send it back to the client
    res.json(err);
  }); 
});
};