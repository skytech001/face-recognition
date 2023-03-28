// const User = require("../models/userModel");
// const AppError = require("../utils/appError");
// const { catchError } = require("../utils/catchError");

// const handleSignin = catchError(async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return next(new AppError("please provide email and password", 400));
//   const user = await User.findOne({ email }).select("+password");
//   if (!user || !(await user.checkPassword(password, user.password)))
//     return next(new AppError("Email or Password incorrect", 401));

//   sendToken(user, req, res);

//   // res.status(200).json({
//   //   status: "success",
//   //   user,
//   // });
// });

// module.exports = {
//   handleSignin: handleSignin,
// };
