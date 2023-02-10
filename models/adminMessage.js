const mongoose = require("mongoose");

const adminMessageSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("AdminMessage", adminMessageSchema);
