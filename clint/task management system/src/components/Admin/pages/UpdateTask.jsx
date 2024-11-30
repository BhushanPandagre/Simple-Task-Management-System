import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateTask = () => {
  // State to store task details
  const [input, setInput] = useState({});
  // Get task ID from URL params
  const { _id } = useParams();
  // Redux selector to check if the current user is an admin
  const isAdmin = useSelector((state) => state.isAdmin);
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/task/updatetask/${_id}`, input)
      .then((res) => {
        console.log(res.data);
        toast.success("Task Updated Successfully");
        navigate("/admin/all-tasks");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  // Function to fetch task details
  const getData = () => {
    try {
      axios
        .get(`http://localhost:5000/api/task/gettask/?_id=${_id}`)
        .then((res) => {
          setInput(res.data[0]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch task details when component mounts
  useEffect(() => {
    getData();
  }, []);

  // Render component based on admin status
  if (isAdmin) {
    return (
      <div className="background_container">
        <section className="add-employee-section">
          <h3>Update Task</h3>
          <form className="form" onSubmit={handleSubmit}>
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

            <div className="input_container">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handleChange}
              />
            </div>

            <div className="input_container">
              <label>Priority</label>
              <br />
              <select
                name="priority"
                value={input.priority}
                onChange={handleChange}
              >
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
            <div className="input_container">
              <label>Status</label>
              <br />
              <select
                name="status"
                value={input.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="input_container">
              <label>Start date</label>
              <input
                type="date"
                name="startdate"
                value={input.startdate}
                onChange={handleChange}
              />
            </div>

            <div className="input_container">
              <label>End Date</label>
              <input
                type="date"
                name="enddate"
                value={input.enddate}
                onChange={handleChange}
              />
            </div>

            <div className="btn_container">
              <button className="btn" type="submit">
                Update Task
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  } else {
    // If not admin, navigate to home page
    navigate("/");
    return null;
  }
};

export default UpdateTask;
