const express = require("express");
const exphnd = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)

const db = mongoose.connection;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./controllers/index.js")(app, db);
require("./controllers/note.js")(app, db);
require("./controllers/article.js")(app, db);



app.engine("handlebars", exphnd({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
}).once("open", function() {
  console.log("Mongoose connection successful.");
});

app.listen(PORT, () => {
    console.log("App listening on PORT: localhost:" + PORT);
});

