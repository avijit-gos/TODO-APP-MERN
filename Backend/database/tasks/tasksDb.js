/** @format */

const mongoose = require("mongoose");
const Task = require("../../schema/tasks/tasksSchema");

class TaskDBQuesry {
  constructor() {
    console.log("Task db query init!!");
  }
  async createTask(title, body, id) {
    const newTask = Task({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      body: body,
      user: id,
    });
    const taskSave = await newTask.save();
    try {
      return taskSave;
    } catch (error) {
      return taskSave;
    }
  }

  async getTaskByUser(id, page, limit, status) {
    if (status === "all") {
      const tasks = await Task.find({ user: id })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
      try {
        return tasks;
      } catch (error) {
        return false;
      }
    } else if (status === "complete") {
      const tasks = await Task.find({
        $and: [{ user: id }, { status: true }],
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
      try {
        return tasks;
      } catch (error) {
        return false;
      }
    } else {
      const tasks = await Task.find({
        $and: [{ user: id }, { status: false }],
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
      try {
        return tasks;
      } catch (error) {
        return false;
      }
    }
  }

  async editTaskById(title, body, id) {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: { title: title, body: body } },
      { new: true }
    );
    try {
      return updatedTask;
    } catch (error) {
      return false;
    }
  }

  async deleteTaskById(id) {
    const task = await Task.findByIdAndDelete(id);
    try {
      return task;
    } catch (error) {
      return false;
    }
  }

  async getTaskById(id) {
    const task = await Task.findById(id);
    console.log(id);
    try {
      return task;
    } catch (error) {
      return false;
    }
  }

  async updateTaskById(id, value, field) {
    const task = await Task.findByIdAndUpdate(
      id,
      { $set: { [field]: value } },
      { new: true }
    );
    try {
      return task;
    } catch (error) {
      return false;
    }
  }
}
module.exports = new TaskDBQuesry();
