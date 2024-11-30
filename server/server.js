import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import database from "./database/dataBase.js";
import routes from "./routes/routes.js";
import { routeNotFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the database
database();

const App = express();

// Middleware
App.use(express.json());
App.use(cors({ origin: "*" })); // Allow requests from all origins
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(morgan("dev"));

// Routes
App.use("/api", routes);

// Error handling middleware
App.use(routeNotFound);
App.use(errorHandler);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});