const router = require("express").Router();
const {
  createBook,
  getSingleUserBooks,
} = require("../controllers/book.controller");

router.post("/book", createBook);
router.get("/book/:authorId", getSingleUserBooks);

module.exports = router;
