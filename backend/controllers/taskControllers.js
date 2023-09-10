const { Task } = require("../models/task");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userID: req.user._id });
    if (!tasks) {
      res.status(400).json({ success: false, msg: "No tasks found!" });
      return;
    } else {
      return res.status(200).json({ success: true, tasks });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      userID: req.user._id,
    });

    if (task) {
      return res.status(201).json({ success: true, task });
    } else {
      return res.status(400).json({ success: false, msg: "Task not created!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskID);
    if (!task) {
      return res.status(404).json({ success: false, msg: "Task not found!" });
    } else {
      const { title, description, status } = req.body;
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;

      await task.save();

      res.status(200).json({ success: true, msg: "Task updated", task });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskID);
    if (!task) {
      return res.status(400).json({ success: false, msg: "Task not found!" });
    } else {
      await task.deleteOne();

      res
        .status(200)
        .json({ success: true, msg: "Task deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
