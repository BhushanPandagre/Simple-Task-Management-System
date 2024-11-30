import React from "react";
import { toast } from "react-toastify";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { PiUsersThreeBold } from "react-icons/pi";
import { TiUserAdd } from "react-icons/ti";
import { MdTask } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin, setIsLogin, setUser } from "../../Slices/AuthSlice";

const Admin = () => {
  // Redux setup
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      // Send logout request to the server
      await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Remove user info from local storage
      localStorage.removeItem("userInfo");
      // Show success message
      toast.success("Logout successful");
      // Reset Redux state
      dispatch(setIsAdmin(false));
      dispatch(setIsLogin(false));
      dispatch(setUser({}));
      // Redirect to the home page
      navigate("/");
    } catch (error) {
      // Log any errors that occur during logout
      console.error("Logout error:", error);
      // Show error message if logout fails
      toast.error("An error occurred during logout");
    }
  };

  // Render admin dashboard if isAdmin is true, otherwise redirect to home
  if (isAdmin) {
    return (
      <div className="admin-layout">
        <div className="sider">
          <div className="dashboard-title">
            <h2>Dashboard</h2>
          </div>
          {/* Sidebar navigation */}
          <ul className="sidebar-menu">
            <li>
              <Link to="/admin/all-users">
                <PiUsersThreeBold className="menu-icon" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/add-user">
                <TiUserAdd className="menu-icon" />
                <span>Add Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/all-tasks">
                <MdTask className="menu-icon" />
                <span>Tasks</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/add-task">
                <MdAddTask className="menu-icon" />
                <span>Add Tasks</span>
              </Link>
            </li>
            {/* Logout button */}
            <li>
              <span onClick={handleLogout} className="logout">
                <IoIosLogOut className="menu-icon" />
                <span>Logout</span>
              </span>
            </li>
          </ul>
        </div>
        {/* Main content area */}
        <div className="main-layout">
          <header className="header">
            <h2 className="admin-nav-emp">Admin Task Management</h2>
          </header>
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
    );
  } else {
    // Redirect to home page if not logged in as admin
    navigate("/");
    // Return null to avoid rendering anything if not logged in as admin
    return null;
  }
};

export default Admin;
