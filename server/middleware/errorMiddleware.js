// Middleware to handle route not found
export const routeNotFound = (req, res, next) => {
  const error = new Error(`Routes not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware to handle errors
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  
  // Check if error is a CastError (MongoDB ObjectId error)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }
  
  // Set response status and send error message
  res.status(statusCode).json({
    message: message,
  });
};