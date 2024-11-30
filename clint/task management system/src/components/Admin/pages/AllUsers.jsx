
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Admin.css";

const AllUsers = () => {
  // State variables
  const [user, setUser] = useState([]); // List of users
  const [isActive, setIsActive] = useState(false); // Confirmation box state
  const [taskId, setTaskid] = useState(""); // User ID to be deleted
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [usersPerPage] = useState(5); // Number of users per page
  const isAdmin = useSelector((state) => state.isAdmin); // Admin status
  const navigate = useNavigate();

  // Toggle confirmation box
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  // Fetch all users
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getuser");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    getUser();
  }, []);

  // Delete a user
  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/user/deleteuser/${taskId}`);
      toast.success("User deleted successfully");
      toggleClass();
      getUser(); // Refresh the user list
    } catch (err) {
      console.log(err);
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(user.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render component
  if (isAdmin) {
    return (
      <div className="alltaskdiv">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td data-column="S.No">{indexOfFirstUser + index + 1}</td>
                <td data-column="Name">{user.name}</td>
                <td data-column="Title">{user.title}</td>
                <td data-column="Email">{user.email}</td>
                <td data-column="Action" style={{ cursor: "pointer" }}>
                  <MdDeleteForever
                    style={{ color: "darkred", fontSize: "25px" }}
                    onClick={() => {
                      setTaskid(user._id);
                      toggleClass();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Confirmation box */}
        {isActive && (
          <div className="confirmation-box">
            <h2>Confirm Deletion</h2>
            <hr />
            <p>Are you sure you want to delete this user?</p>
            <div className="confirmation-box-buttons">
              <button className="yes" onClick={deleteUser}>
                Yes
              </button>
              <button className="no" onClick={toggleClass}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    // Redirect if not admin
    navigate("/");
    return null;
  }
};

export default AllUsers;
