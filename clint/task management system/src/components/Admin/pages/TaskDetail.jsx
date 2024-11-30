import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TaskDetail = () => {
  const [input, setInput] = useState({});
  const [user, setUser] = useState();
  const { _id } = useParams();
  const isAdmin = useSelector((state) => state.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/task/gettask/?_id=${_id}`
      );
      setInput(res.data[0]);
      setUser(res.data[0].assign.name);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div className="background_container">
      <section className="task-card-section">
        <div className="task-card">
          <h3 className="task-title">{input.title}</h3>
          <div className="task-details">
            <p>
              <span className="icon">📝</span> <strong>Description:</strong>{" "}
              {input.description}
            </p>
            <p>
              <span className="icon">👤</span> <strong>Assigned To:</strong>{" "}
              {user}
            </p>
            <p>
              <span className="icon">⚡</span> <strong>Priority:</strong>{" "}
              {input.priority}
            </p>
            <p>
              <span className="icon">🔄</span> <strong>Status:</strong>{" "}
              {input.status}
            </p>
            <p>
              <span className="icon">📅</span> <strong>Start Date:</strong>{" "}
              {input.startdate}
            </p>
            <p>
              <span className="icon">⏰</span> <strong>End Date:</strong>{" "}
              {input.enddate}
            </p>
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>
            🔙 Back
          </button>
        </div>
      </section>

      {/* Styles */}
      <style>
        {`
          /* Background styling */
          .background_container {
            display: flex;
            justify-content: center;
            align-items: center;
          
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            font-family: 'Roboto', sans-serif;
          }

          /* Card Section */
          .task-card-section {
            width: 100%;
            max-width: 700px;
            margin: auto;
            padding: 20px;
          }

          /* Task Card */
          .task-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 16px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            padding: 30px;
            text-align: left;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .task-card:hover {
            transform: scale(1.02);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
          }

          /* Title */
          .task-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 20px;
            color: #2b2b2b;
          }

          /* Task Details */
          .task-details p {
            font-size: 18px;
            margin: 12px 0;
            color: #333;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .task-details strong {
            font-weight: 600;
            color: #2b2b2b;
          }

          /* Back Button */
          .back-button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #6a11cb;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }

          .back-button:hover {
            background-color: #2575fc;
            transform: scale(1.05);
          }

          /* Icons */
          .icon {
            font-size: 22px;
            color: #6a11cb;
          }

          /* Media Query for Responsive Design */
          @media (max-width: 768px) {
            .task-card {
              padding: 20px;
            }
            .task-title {
              font-size: 24px;
            }
            .task-details p {
              font-size: 16px;
            }
            .back-button {
              font-size: 14px;
              padding: 8px 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TaskDetail;
