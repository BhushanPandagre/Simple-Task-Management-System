import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to manage form input values
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    title: "",
    isAdmin: false,
  });

  // Get isAdmin status from Redux store
  const isAdmin = useSelector((state) => state.isAdmin);
  const navigate = useNavigate();

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to server to add new employee
      const response = await axios.post("http://localhost:5000/api/user/register", input);
      toast.success(response.data.message);

      // Clear form inputs after successful submission
      setInput({
        name: "",
        email: "",
        password: "",
        title: "",
        isAdmin: false,
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  // Redirect to home if user is not an admin
  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div className="background_container">
      <section className="add-employee-section">
        <h3>Add Employee</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input_container">
            <label>Name</label>
            <input
              type="text"
              name="name"
              minLength="1"
              maxLength="50"
              value={input.name}
              onChange={handleChange}
            />
          </div>
          <div className="input_container">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
          </div>
          <div className="input_container">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
            />
          </div>
          <div className="input_container">
            <label>Make Admin?</label>
            <br />
            <select
              name="isAdmin"
              value={input.isAdmin}
              onChange={handleChange}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <div className="input_container">
            <label>Password</label>
            <div className="password_container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="btn_container">
            <button className="btn" type="submit">
              Create user
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddEmployee;