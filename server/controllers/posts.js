const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }).single("file");

exports.fileUpload = asyncHandler(async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json("Something went wrong!");
    }
    res.status(200).json({ file: req.file });
  });
});
