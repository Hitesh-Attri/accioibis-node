const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  getMyProfile,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/logout", logout);
router.get("/get-my-profile", isAuthenticated, getMyProfile);

module.exports = router;
