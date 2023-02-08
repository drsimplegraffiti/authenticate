const {
  userSignUp,
  userLogin,
  userProfile,
  sendBulkEmail,
} = require("../controllers/user.controller");

const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

// const router = require("express").Router();

router.post("/register", userSignUp);
router.post("/login", userLogin);

// authentication route - protect the route using jwt middleware
router.get("/profile", isAuthenticated, userProfile); // user p

router.get("/bulk", isAuthenticated, sendBulkEmail); // authentication -- signed , using jwt token

module.exports = router;
