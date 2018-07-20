var path = require("path")
const express = require('express')
const app = express()

module.exports = function(app) {
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
  });

}
