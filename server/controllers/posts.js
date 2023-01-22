const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

exports.fileUpload = asyncHandler(async (req, res) => {
  const file = req.file;
  res.status(200).json({ file });
});
