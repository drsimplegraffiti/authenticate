const Vote = require("../models/vote.model");

// create a new vote
exports.createVote = async (req, res) => {
  try {
    const { candidate } = req.body;
    const vote = await Vote.create({
      candidate,
    });
    return res.status(201).json({
      message: "Vote created successfully",
      vote,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// vote for a candidate using the increment operator from mongoose
exports.voteForCandidate = async (req, res) => {
  try {
    const id = req.params.id;
    const vote = await Vote.findByIdAndUpdate(
      id,
      {
        $inc: { voteCount: -1 }, // $ is a mongoose operator
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Vote updated successfully",
      vote,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};



