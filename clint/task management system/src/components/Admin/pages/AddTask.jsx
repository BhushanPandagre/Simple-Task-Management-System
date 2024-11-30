import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Admin.css";
const AddTask = () => {
  // State variables to manage form input and user data
  const [input, setInput] = useState({
    title: "",
    description: "",
    assign: { id: "", name: "" },
    priority: "",
    status: "",
    startdate: "",
    enddate: "",
  });
  const [user, setUser] = useState([]);

  // Redux selector to check if the user is an admin
  const isAdmin = useSelector((state) => state.isAdmin);

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Update the input state based on the input name
    if (name === "assign") {
      const selectedUser = user.find((usr) => usr._id === value);
      setInput({
        ...input,
        assign: { id: selectedUser._id, name: selectedUser.name },
      });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to add a new task
      await axios.post("http://localhost:5000/api/task/settask", input);
      toast.success("Task Added Successfully");

      // Clear the form inputs after successful submission
      setInput({
        title: "",
        description: "",
        assign: { id: "", name: "" },
        priority: "",
        status: "",
        startdate: "",
        enddate: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  // Function to fetch user data from the server
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getuser");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Effect hook to fetch user data when the component mounts
  useEffect(() => {
    getUser();
  }, []);

  // If the user is not an admin, redirect to the home page
  if (!isAdmin) {
    navigate("/");
    return null;
  }

  // Render the add task form
  return (
    <div className="background_container">
      <section className="add-employee-section">
        <h3>Add Task</h3>
        <form className="form" onSubmit={handleSubmit}>
          {/* Task Title Input */}
          <div className="input_container">
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              minLength="1"
              maxLength="50"
              value={input.title}
              onChange={handleChange}
            />
          </div>

          {/* Description Input */}
          <div className="input_container">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={handleChange}
            />
          </div>

          {/* Assigned To Select */}
          <div className="input_container">
            <label>Assigned to</label>
            <br />
            <select
              name="assign"
              id="isAdmin"
              value={input.assign.id}
              onChange={handleChange}
            >
              <option value="">Select User</option>
              {user.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Select */}
          <div className="input_container">
            <label>Priority</label>
            <br />
            <select
              name="priority"
              id="isAdmin"
              value={input.priority}
              onChange={handleChange}
            >
              <option value="">Select Priority</option>
              <option className="medium-priority" value="Medium">
                Medium
              </option>
              <option className="high-priority" value="High">
                High
              </option>
              <option className="low-priority" value="Low">
                Low
              </option>
            </select>
          </div>

          {/* Status Select */}
          <div className="input_container">
            <label>Status</label>
            <br />
            <select
              name="status"
              id="isAdmin"
              value={input.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Assign Date Input */}
          <div className="input_container">
            <label>Assign Date</label>
            <input
              type="date"
              name="startdate"
              value={input.startdate}
              onChange={handleChange}
            />
          </div>

          {/* Submit Date Input */}
          <div className="input_container">
            <label>Submit Date</label>
            <input
              type="date"
              name="enddate"
              value={input.enddate}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="btn_container">
            <button type="submit" className="btn">
              Add Task
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddTask;
