const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: ""
  },
  // url string for thumbnail image
  image: {
    type: String,
    default: ""
  },
  // url for recipe web page - unique index
  link: {
    type: String,
    default: "",
    unique: true
  },
  title: {
    type: String,
    default: ""
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
