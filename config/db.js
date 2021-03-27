const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();
const db = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process
    process.exit(1);
  }
};

module.exports = connectDB;
