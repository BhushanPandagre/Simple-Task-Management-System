import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// Define routes for user operations
router.post("/register", registerUser); // Route to register a new user
router.post("/login", loginUser); // Route to login a user
router.post("/logout", logoutUser); // Route to logout a user
router.get("/getuser", getUser); // Route to get all users
router.delete("/deleteuser/:id", deleteUser); // Route to delete a user

export default router;