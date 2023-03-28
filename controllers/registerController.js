// const User = require("../models/userModel");
// const AppError = require("../utils/appError");
// const { catchError } = require("../utils/catchError");

// const handleRegister = catchError(async (req, res, next) => {
//   const user = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   if (!user) return next(new AppError("Email already exist"));
//   res.status(200).json({
//     staus: "success",
//     user,
//   });
// });

// module.exports = {
//   handleRegister: handleRegister,
// };
