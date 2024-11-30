import mongoose from "mongoose";

// Define the schema for tasks
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startdate: {
      type: String,
      default: Date.now(),
    },
    enddate: {
      type: String,
    },
    assign: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
      name: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["Pending", "InProgress", "Completed"], // Define possible values
      default: "Pending", // Set a default value if needed
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"], // Define possible values
      default: "Medium", // Set a default value if needed
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create a Task model based on the schema
const Task = mongoose.model("Task", taskSchema);

export default Task;