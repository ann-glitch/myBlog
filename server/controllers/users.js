const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

//register user
exports.register = asyncHandler(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorResponse("passwords do not match", 400));
  }

  const user = await User.create(req.body);

  //create jwt token
  const token = user.getSignedWebToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
  });
});

//login user
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  //validation
  if (!username || !password) {
    return next(
      new ErrorResponse("Please provide a username and password", 400)
    );
  }

  //check for user
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid password", 401));
  }

  //create jwt token
  const token = user.getSignedWebToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(200).cookie("token", token, options).json({
    id: user._id,
    username,
  });
});

//get profile info
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//logout
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json("OK");
});
