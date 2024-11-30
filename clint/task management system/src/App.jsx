
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Authentication/Login";
import "./App.css";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import AddTask from "./components/Admin/pages/AddTask";
import AllTasks from "./components/Admin/pages/AllTasks";
import AllUsers from "./components/Admin/pages/AllUsers";
import UpdateTask from "./components/Admin/pages/UpdateTask";
import TaskDetail from "./components/Admin/pages/TaskDetail";
import AddEmployee from "./components/Admin/pages/AddEmployee";

// Example authentication check
const isAuthenticated = true; // Replace with actual auth logic
const isAdmin = true; // Replace with actual admin check logic

const ProtectedRoute = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllUsers />} /> {/* Default route for admin */}
          <Route path="add-user" element={<AddEmployee />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-tasks" element={<AllTasks />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="updatetask/:_id" element={<UpdateTask />} />
          <Route path="taskdetail/:_id" element={<TaskDetail />} />
        </Route>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
