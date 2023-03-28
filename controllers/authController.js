const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { catchError } = require("../utils/catchError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenCookie = (user, req, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(200).json({
    status: "success",
    user,
  });
};

exports.handleSignin = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("please provide email and password", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError("Email or Password incorrect", 401));

  sendTokenCookie(user, req, res);
});

exports.handleRegister = catchError(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) return next(new AppError("Email already exist"));
  sendTokenCookie(user, req, res);
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
