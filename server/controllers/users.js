const User = require("../models/User");
const asyncHandler = require("express-async-handler");

//register user
exports.register = asyncHandler(async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "passwords do not match",
    });
  }

  const user = await User.create(req.body);

  sendTokenResponse(user, 200, res);
});

//login user
exports.login = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const { username, password } = req.body;

  //validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide a username and password",
    });
  }

  //check for user
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  sendTokenResponse(user, 200, res);
});

//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //create token
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

  res.status(statusCode).cookie("token", token).json({
    success: true,
    token,
  });
};
