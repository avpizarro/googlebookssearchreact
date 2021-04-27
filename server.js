const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

const books = require("./routes/api/books");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use routes
app.use('/api/books', books);

// DB config
const db = require("./config/keys").mongoURI;

// Connect to the Mongo DB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
// process.env.MONGODB_URI || "mongodb://localhost/googlebooks",

//Start the API Server
app.listen(PORT, () => console.log(`🌎 ==> API server now on port ${PORT}!`));
