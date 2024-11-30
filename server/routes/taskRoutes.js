import express from "express";
import {
  setTask,
  updateTask,
  deleteTask,
  getTask,
  getEmployeeTask
} from "../controllers/taskController.js";

const router = express.Router();

// Define routes for task operations
router.post("/settask", setTask); // Route to set a new task
router.put("/updatetask/:id", updateTask); // Route to update a task
router.delete("/deletetask/:id", deleteTask); // Route to delete a task
router.get("/gettask", getTask); // Route to get all tasks
router.get("/getemployeetask/:id", getEmployeeTask); // Route to get tasks assigned to an employee

export default router;