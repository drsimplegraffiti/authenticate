// import packages
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const voteRoutes = require("./routes/vote.routes");
const adminRoutes = require("./routes/admin.routes");
const bookRoutes = require("./routes/book.routes");

// create an instance of express
const app = express();

// middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Wakanda");
});

// mount routes
app.use("/api/v1", userRoutes); //http://localhost:4545/api/v1/register
app.use("/api/v1", voteRoutes); //http://localhost:4545/api/v1/vote
app.use("/api/v1", adminRoutes); //http://localhost:4545/api/v1/vote
app.use("/api/v1", bookRoutes); //http://localhost:4545/api/v1/vote

connectDB();

// catch 404 errors and forward them to error handler
app.use((req, res, next) => {
  const error = new Error("Not found 😥");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Something went wrong 🔥🔥🔥🔥🔥🔥",
    },
  });
});

// app.all("*", (req, res) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't find ${req.originalUrl} on this server!`,
//   });
// });


module.exports = app;
