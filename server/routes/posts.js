const express = require("express");
const { fileUpload } = require("../controllers/posts");

const router = express.Router();

router.post("/create", fileUpload);

module.exports = router;
