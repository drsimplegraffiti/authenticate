const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voteCount: {
    type: Number,
    required: true,
    default: 0,
  },
  candidate: {
    type: String,
    required: true,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
