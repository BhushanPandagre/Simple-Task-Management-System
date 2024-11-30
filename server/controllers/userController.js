import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/index.js";

// Controller function to register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      role,
      title,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller function to login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // If user and password match, create JWT token
    if (user && isMatch) {
      createJWT(res, user._id);
      user.password = undefined; // Remove password from response
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Email and password do not match",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller function to logout a user
export const logoutUser = async (req, res) => {
  try {
    // Clear cookie token
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logged out successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// Controller function to get all users
export const getUser = async (req, res) => {
  try {
    // Find all users
    let data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller function to delete a user
export const deleteUser = async (req, res) => {
  try {
    // Find user by ID and delete
    let data = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};