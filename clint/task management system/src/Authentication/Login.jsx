import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setIsAdmin, setIsLogin, setUser } from "../Slices/AuthSlice";

const Login = () => {
  // State for managing input values and loading/error states
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = file;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    setFile({ ...file, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFile({ ...file, loading: true });

    // Check if both fields are filled
    if (!email || !password) {
      setFile({ ...file, loading: false, error: "All fields are required" });
      toast.warning("All fields are required");
      return;
    }

    try {
      // Send login request to server
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      const data = res.data;
      console.log(res.data);
      if (data.success === false) {
        setFile({
          ...file,
          error: data.message,
          loading: false,
        });
        toast.error(data.message);
        return;
      }

      // Clear form state and reset error/loading states
      setFile({
        email: "",
        password: "",
        error: null,
        loading: false,
      });

      // Store user info in local storage
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      toast.success("Login successful");

      // Navigate to appropriate dashboard based on admin status
      if (data.user.isAdmin === true) {
        navigate("/admin");
        dispatch(setIsAdmin(true));
      } else {
        navigate("/user");
        dispatch(setIsAdmin(false));
      }

      // Update Redux state with login status and user details
      dispatch(setIsLogin(true));
      dispatch(setUser(data.user));
    } catch (error) {
      setFile({
        ...file,
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="background_container_login">
      <section>
        <h3>Account Login</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input_container">
            <label>Email</label>
            <input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="input_container">
            <label>Password</label>
            <div className="password_container">
              <input
                placeholder="Enter Your Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="btn_container">
            <button className="btn" disabled={loading}>
              {loading ? "Logging in ..." : "Login"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;