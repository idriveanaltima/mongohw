const express = require("express");
const exphnd = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require('cheerio');
var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphnd({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controllers/index.js")(app);

// app.use(route);

app.listen(PORT, () => {
    console.log("App listening on PORT: localhost:" + PORT);
});

