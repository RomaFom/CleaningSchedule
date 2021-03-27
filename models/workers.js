const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Worker = mongoose.model("Worker", UserSchema);
