const User = require("../models/userModel");

const handleRegister = async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(200).json({
    staus: "success",
    user,
  });
};

module.exports = {
  handleRegister: handleRegister,
};
