const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };

  if (err.code === 11000)
    error = new AppError("Email has been taken.Please use another email", 500);

  res.status(err.statusCode).json({
    status: err.status,
    message: error.message,
  });
};
