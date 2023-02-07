// import packages
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const voteRoutes = require("./routes/vote.routes");

// create an instance of express
const app = express();

// middle wares
app.use(express.json());

// mount routes
app.use("/api/v1", userRoutes); //http://localhost:4545/api/v1/register
app.use("/api/v1", voteRoutes); //http://localhost:4545/api/v1/vote

connectDB();

module.exports = app;
