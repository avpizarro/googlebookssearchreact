const router = require("express").Router();

// Books Model
const Book = require("../../models/Book");

// @route GET api/books
// @desc Get All books
// @access Public
router.get("/", (req, res) => {
  Book.find()
    .sort({ title: 1 })
    .then((books) => res.json(books));
});

// @route POST api/books
// @desc Add book
// @access Public
router.post("/", (req, res) => {
  Book.create(req.body)
  .then((book) => res.json(book))
  .catch((err) => res.status(404).json({ success: false }));
});

// @route DELETE api/books
// @desc Delete a book
// @access Public
router.delete("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((item) => item.remove()
    .then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
