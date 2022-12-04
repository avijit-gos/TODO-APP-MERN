/** @format */

const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, trim: true, require: true },
    body: { type: String, trim: true, require: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", index: true },
    pin: { type: Boolean, default: false },
    status: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
