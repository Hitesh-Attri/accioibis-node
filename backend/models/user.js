const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, uniqure: true },
    email: { type: String, required: true, uniqure: true },
    password: { type: String, required: true, select: false },
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
