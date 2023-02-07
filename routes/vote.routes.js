const {
  createVote,
  voteForCandidate,
} = require("../controllers/vote.controller");

const router = require("express").Router();

router.post("/vote", createVote);
router.put("/vote/:id", voteForCandidate);

module.exports = router;
