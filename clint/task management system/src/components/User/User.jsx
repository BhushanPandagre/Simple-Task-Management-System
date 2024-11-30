// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AiOutlineLogout } from 'react-icons/ai';
// import { MdExitToApp } from 'react-icons/md';
// import { MdEditSquare } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsAdmin, setIsLogin, setUser } from "../../Slices/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import "./User.css"

// const User = () => {
//   // State variables
//   const [task, setTask] = useState([]);
//   const [isActive, setIsActive] = useState(false);
//   const [taskId, setTaskId] = useState("");
//   const [updatedStatus, setUpdatedStatus] = useState("");

//   // Redux setup
//   const dispatch = useDispatch();
//   const isAdmin = useSelector((state) => state.isAdmin);
//   const isLogin = useSelector((state) => state.isLogin);
//   const navigate = useNavigate();

//   // Toggle confirmation box
//   const toggleClass = () => {
//     setIsActive(!isActive);
//   };

//   // Logout function
//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:5000/api/user/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       localStorage.removeItem("userInfo");
//       toast.success("Logout successful");
//       dispatch(setIsAdmin(false));
//       dispatch(setIsLogin(false));
//       dispatch(setUser(null));
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("An error occurred during logout");
//     }
//   };

//   // Fetch user tasks
//   const getTasks = () => {
//     try {
//       axios
//         .get(`http://localhost:5000/api/task/getemployeetask/${userDetail._id}`)
//         .then((response) => {
//           setTask(response.data);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Update task status
//   const updateTaskStatus = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/task/updatetask/${taskId}`,
//         {
//           status: updatedStatus,
//         }
//       );
//       toast.success("Task updated successfully");
//       toggleClass();
//       getTasks();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Fetch user details from local storage
//   const userDetail = JSON.parse(localStorage.getItem("userInfo"));

//   // Fetch user tasks on component mount
//   useEffect(() => {
//     getTasks();
//   }, []);

//   // Render user dashboard if not admin and logged in, otherwise redirect to home page
//   if (!isAdmin && isLogin) {
//     return (
//       <div className="alltaskdiv">
//         <div className="user-container-main">
//           <div className="user">
//             <div className="user-nav">
//               <h2>User Task Management</h2>
//               <p>
//                 <label onClick={handleLogout}>Logout</label>
//                 <MdExitToApp className="logout-button" />
//               </p>
//             </div>
//             <div className="user-task">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>S.No</th>
//                     <th>Task Title</th>
//                     <th>Description</th>
//                     <th>Priority</th>
//                     <th>Assign Date</th>
//                     <th>Submit Date</th>
//                     <th>Status</th>
//                     <th>Change Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {task.map((key, index) => {
//                     return (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{key.title}</td>
//                         <td>{key.description}</td>
//                         <td>{key.priority}</td>
//                         <td>{key.startdate}</td>
//                         <td>{key.enddate}</td>
//                         <td>{key.status}</td>
//                         <td onClick={() => {
//                           setTaskId(key._id);
//                           toggleClass();
//                         }}>
//                           <MdEditSquare className="update-task" />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {isActive && (
//             <div className="confirmation-box">
//               <h2>Confirm Please</h2>
//               <hr size="1" color="brown" />
//               <p>Do you Really want to update the status of this task?</p>
//               <div className="input_container">
//                 <label>Status:</label>
//                 <br />
//                 <select
//                   name="status"
//                   id="isAdmin"
//                   value={updatedStatus}
//                   onChange={(e) => setUpdatedStatus(e.target.value)}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="InProgress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>
//               <div className="confirmation-box-buttons">
//                 <button style={{ backgroundColor: "green" }} onClick={updateTaskStatus}>
//                   Yes
//                 </button>
//                 <button style={{ backgroundColor: "red" }} onClick={toggleClass}>
//                   No
//                 </button>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     );
//   } else {
//     navigate("/");
//     return null;
//   }
// };

// export default User;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdExitToApp } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin, setIsLogin, setUser } from "../../Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import "./User.css";

const User = () => {
  // State variables
  const [task, setTask] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  // Redux setup
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();

  // Toggle confirmation box
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("userInfo");
      toast.success("Logout successful");
      dispatch(setIsAdmin(false));
      dispatch(setIsLogin(false));
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  // Fetch user tasks
  const getTasks = () => {
    try {
      axios
        .get(`http://localhost:5000/api/task/getemployeetask/${userDetail._id}`)
        .then((response) => {
          setTask(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Update task status
  const updateTaskStatus = async () => {
    try {
      await axios.put(`http://localhost:5000/api/task/updatetask/${taskId}`, {
        status: updatedStatus,
      });
      toast.success("Task updated successfully");
      toggleClass();
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch user details from local storage
  const userDetail = JSON.parse(localStorage.getItem("userInfo"));

  // Fetch user tasks on component mount
  useEffect(() => {
    getTasks();
  }, []);

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = task.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(task.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render user dashboard if not admin and logged in, otherwise redirect to home page
  if (!isAdmin && isLogin) {
    return (
      <div className="alltaskdiv">
        <div className="user-container-main">
          <div className="user">
            <div className="user-nav">
              <h2>User Task Management</h2>
              <p>
                <label onClick={handleLogout}>Logout</label>
                <MdExitToApp className="logout-button" />
              </p>
            </div>
            <div className="user-task">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Task Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Assign Date</th>
                    <th>Submit Date</th>
                    <th>Status</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((key, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstTask + index + 1}</td>
                      <td>{key.title}</td>
                      <td>{key.description}</td>
                      <td>{key.priority}</td>
                      <td>{key.startdate}</td>
                      <td>{key.enddate}</td>
                      <td>{key.status}</td>
                      <td
                        onClick={() => {
                          setTaskId(key._id);
                          toggleClass();
                        }}
                      >
                        <MdEditSquare className="update-task" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
          </div>

          {isActive && (
            <div className="confirmation-box">
              <h2>Confirm Please</h2>
              <hr size="1" color="brown" />
              <p>Do you really want to update the status of this task?</p>
              <div className="input_container">
                <label>Status:</label>
                <br />
                <select
                  name="status"
                  id="isAdmin"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="confirmation-box-buttons">
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={updateTaskStatus}
                >
                  Yes
                </button>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={toggleClass}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    navigate("/");
    return null;
  }
};

export default User;
