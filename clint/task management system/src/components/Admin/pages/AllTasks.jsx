

import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../Admin.css";

const AllTasks = () => {
  // State variables
  const [task, setTask] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskid] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [tasksPerPage] = useState(5); // Tasks per page
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.isAdmin);

  // Toggle confirmation box
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  // Fetch all tasks
  const getTask = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/task/gettask");
      setTask(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    getTask();
  }, []);

  // Delete task
  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/task/deletetask/${taskId}`);
      toggleClass();
      getTask();
    } catch (err) {
      console.log(err);
    }
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = task.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(task.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="alltaskdiv">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Assigned To</th>
              <th>Task Title</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((key, index) => {
              let priorityClass = "";
              if (key.priority === "High") priorityClass = "high-priority";
              if (key.priority === "Medium") priorityClass = "medium-priority";
              if (key.priority === "Low") priorityClass = "low-priority";
              return (
                <tr className={priorityClass} key={key._id}>
                  <td data-column="S.No">{indexOfFirstTask + index + 1}</td>
                  <td data-column="Assigned To">{key.assign.name}</td>
                  <td data-column="Task Title">{key.title}</td>
                  <td data-column="Due Date">{key.enddate}</td>
                  <td data-column="Status">{key.status}</td>
                  <td data-column="Action">
                    <MdDeleteForever
                      style={{ color: "darkred", cursor: "pointer" }}
                      fontSize="25px"
                      onClick={() => {
                        setTaskid(key._id);
                        toggleClass();
                      }}
                    />
                    <CiEdit
                      style={{
                        color: "blue",
                        fontSize: "25px",
                        marginLeft: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/admin/updatetask/" + key._id);
                      }}
                    />
                    <FaEye
                      style={{
                        color: "green",
                        fontSize: "25px",
                        marginLeft: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/admin/taskdetail/" + key._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
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

        {/* Confirmation Box */}
        {isActive && (
          <div className="confirmation-box">
            <h2>Confirm Deletion</h2>
            <hr />
            <p>Are you sure you want to delete this task?</p>
            <div className="confirmation-box-buttons">
              <button className="yes" onClick={deleteTask}>
                Yes
              </button>
              <button className="no" onClick={toggleClass}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllTasks;
