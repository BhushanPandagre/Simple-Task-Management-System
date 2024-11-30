// Importing task and employee models
import task from "../models/taskModel.js";
import employee from "../models/userModel.js";

// Controller function to create a new task
export const setTask = async (req, res) => {
  try {
    let data = new task(req.body); // Create a new task object with request body
    await data.save(); // Save the task to the database

    // Update the tasks array of the assigned employee
    await employee.findByIdAndUpdate(data.assign.id, {
      $push: { tasks: data._id }, // Push the ID of the new task to the tasks array
    });

    console.log(data);
    res.status(200).json(data); // Send response with the saved task object
  } catch (err) {
    // Error handling
    res.status(404).json({ success: false, message: "internal server error" });
    console.log(err);
  }
};

// Controller function to update an existing task
export const updateTask = async (req, res) => {
  try {
    let data = await task.findByIdAndUpdate(req.params.id, req.body); // Find task by ID and update with request body
    data.save().then((resp) => {
      res.json(resp); // Send response with updated task object
    });
  } catch (err) {
    // Error handling
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

// Controller function to delete a task
export const deleteTask = async (req, res) => {
  try {
    let data = await task.findByIdAndDelete(req.params.id); // Find task by ID and delete
    if (data.assign.id) {
      // If task is assigned to an employee, update employee's tasks array
      await employee.findByIdAndUpdate(data.assign.id, {
        $pull: { tasks: data._id }, // Remove the ID of the deleted task from tasks array
      });
    }
    res.json(data); // Send response with deleted task object
  } catch (err) {
    // Error handling
    res.status(404).json({ success: false, message: "internal server error" });
    console.log(err);
  }
};

// Controller function to get all tasks
export const getTask = async (req, res) => {
  try {
    let data = await task.find(); // Find all tasks
    res.json(data); // Send response with all tasks
  } catch (err) {
    // Error handling
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

// Controller function to get tasks assigned to a specific employee
export const getEmployeeTask = async (req, res) => {
  try {
    let emp_id = req.params.id; // Get employee ID from request parameters
    console.log("works  " + emp_id);
    let data = await task.find(); // Find all tasks
    data = data.filter((key) => {
      return emp_id == key.assign.id; // Filter tasks by assigned employee ID
    });
    res.json(data); // Send response with filtered tasks
    console.log(data);
  } catch {
    // Error handling
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};