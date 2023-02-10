const Book = require("../models/book.model");

exports.createBook = async (req, res) => {
  const { title, pages, author } = req.body;
  try {
    if (!(title && pages))
      return res.status(400).json({
        error: "All fields are required",
      });
    const book = await Book.create({
      title,
      pages,
      author,
    });
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
  }
};

// retrieve all books for a single user
exports.getSingleUserBooks = async (req, res) => {
  const authorId = req.params.authorId;
  try {
    const book = await Book.find({ author: authorId }).populate({
      path: "author",
      select: "first_name last_name",
    });

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};
