/** @format */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, trim: true, minLength: 3 },
    username: {
      type: String,
      trim: true,
      require: true,
      unique: true,
      minLength: 5,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    profilePic: { type: String, trim: true, default: "" },
    password: { type: String, trim: true, require: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
