/** @format */
const {
  createTask,
  getTaskByUser,
  editTaskById,
  deleteTaskById,
  getTaskById,
  updateTaskById,
} = require("../../database/tasks/tasksDb");

class TaskController {
  constructor() {
    console.log("Task controller running !!");
  }
  // *** 1. Create task
  async createNewTask(req, res) {
    const { title, body } = req.body;
    if (!title.trim() || !body.trim()) {
      return res.status(400).json({ msg: "Invalid request to create a task" });
    } else {
      const newTask = await createTask(title, body, req.user._id);
      if (!newTask) {
        return res.status(400).json({ msg: "Something went wrong!!" });
      } else {
        console.log(newTask);
        return res
          .status(201)
          .json({ msg: "Task has been created", task: newTask });
      }
    }
  }
  // *** 2. Fetch all tasks with pagination
  async fetchTasks(req, res) {
    const { page, limit, status } = req.query;
    const getTasks = await getTaskByUser(req.user._id, page, limit, status);
    return res.status(200).json(getTasks);
  }
  // *** 3. Edit Task
  async editTask(req, res) {
    const { title, body } = req.body;
    if (!req.params.id) {
      return res.status(400).json({ msg: " Invalid request ID" });
    } else {
      if (!title.trim() || !body.trim()) {
        return res
          .status(400)
          .json({ msg: "Invalid request to create a task" });
      } else {
        const editedTask = await editTaskById(title, body, req.params.id);
        if (!editedTask) {
          return res.status(400).json({ msg: "Something went wrong" });
        } else {
          return res
            .status(200)
            .json({ msg: "Task has been edited", task: editedTask });
        }
      }
    }
  }
  // *** 4. Delete task
  async deleteTask(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ msg: " Invalid request ID" });
    } else {
      var task = await deleteTaskById(req.params.id);
      if (!task) {
        return res.status(400).json({ msg: "Something went wrong" });
      } else {
        return res.status(200).json({ msg: "Task has been deleted" });
      }
    }
  }
  // *** 5. pinned task
  async pinnTask(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ msg: " Invalid request ID" });
    } else {
      var task = await getTaskById(req.params.id);
      if (!task) {
        return res.status(400).json({ msg: "No task available" });
      } else {
        const isPinned = task && task.pin;
        if (isPinned) {
          const updateTask = await updateTaskById(req.params.id, false, "pin");
        } else {
          const updateTask = await updateTaskById(req.params.id, true, "pin");
        }
        return res.status(200).json({ msg: "You set this task as importent" });
      }
    }
  }
  // *** 6. change the status of the task
  async changeStatus(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ msg: " Invalid request ID" });
    } else {
      var task = await getTaskById(req.params.id);
      if (!task) {
        return res.status(400).json({ msg: "No task available" });
      } else {
        const isStatus = task && task.status;
        if (isStatus) {
          const updateTask = await updateTaskById(
            req.params.id,
            false,
            "status"
          );
        } else {
          const updateTask = await updateTaskById(
            req.params.id,
            true,
            "status"
          );
        }
        return res.status(200).json({ msg: "You complete this task" });
      }
    }
  }
}

module.exports = new TaskController();
