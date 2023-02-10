const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  pages: {
    type: Number,
    default: 0,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId, //mongoose.Schema.Types.ObjectId
    ref: "User",
  },
});

module.exports = mongoose.model("Book", bookSchema);
