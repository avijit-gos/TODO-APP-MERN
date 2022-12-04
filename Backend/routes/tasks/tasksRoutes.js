/** @format */

const router = require("express").Router();
const auth = require("../../middleware/auth");
const {
  createNewTask,
  fetchTasks,
  editTask,
  deleteTask,
  pinnTask,
  changeStatus,
} = require("../../controllers/tasks/tasksController");

// *** 1. Create task
router.post("/create", auth, createNewTask);
// *** 2. Fetch all tasks with pagination
router.get("/fetch", auth, fetchTasks);
// *** 3. Edit Task
router.put("/edit/:id", auth, editTask);
// *** 4. Delete task
router.delete("/delete/:id", auth, deleteTask);
// *** 5. pinned task
router.put("/pinn/:id", auth, pinnTask);
// *** 6. change the status of the task
router.put("/status/:id", auth, changeStatus);

module.exports = router;
