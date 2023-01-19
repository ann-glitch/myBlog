const express = require("express");
const { register, login, getProfile, logout } = require("../controllers/users");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.get("/logout", logout);

module.exports = router;
