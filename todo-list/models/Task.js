const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "in progress", "done"]
    }
  },
  {
    versionKey: false
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
