const express = require("express");
const exphnd = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = mongoose.connection;

const app = express();

const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)

require("./controllers/index.js")(app);
require("./controllers/scrape.js")(app);
require("./controllers/article.js")(app);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphnd({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
}).once("open", function() {
  console.log("Mongoose connection successful.");
});

app.listen(PORT, () => {
    console.log("App listening on PORT: localhost:" + PORT);
});

