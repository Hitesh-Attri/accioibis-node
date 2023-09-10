const express = require("express");
const { isAuthenticated } = require("../middlewares/authentication");
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");
const router = express.Router();

router.route("/new").post(isAuthenticated, createTask);
router.route("/get-all").get(isAuthenticated, getAllTasks);
router
  .route("/:taskID")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

module.exports = router;
