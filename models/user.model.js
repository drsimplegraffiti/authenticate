const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      unique: [true, "email already exist"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "email is required"],
      // select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
