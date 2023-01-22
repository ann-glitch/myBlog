const express = require("express");
const { fileUpload } = require("../controllers/posts");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/create", upload.single("file"), fileUpload);

module.exports = router;
