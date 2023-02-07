const {
  userSignUp,
  userLogin,
  userProfile,
} = require("../controllers/user.controller");

const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

// const router = require("express").Router();

router.post("/register", userSignUp);
router.post("/login", userLogin);

// authentication route
router.get("/profile", isAuthenticated, userProfile);

module.exports = router;
