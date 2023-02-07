const mongoose = require("mongoose");
const color = require("colors");

let dbUrl;
if (process.env.NODE_ENV === "development") {
  dbUrl = process.env.MONGO_URI_DEV;
} else {
  dbUrl = process.env.MONGO_URI_PROD;
}

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("connected to db".yellow);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
