const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

module.exports = Schedule = mongoose.model("Schedule", UserSchema);
