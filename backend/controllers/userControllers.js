const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { sendCookies } = require("../utils/features");

const createUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ username });

    if (user) {
      // console.log(user, "existing user");
      res.status(400).json({ msg: "User already exists!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ username, email, password: hashedPassword });

    sendCookies(res, user, "User created successfully!");
  } catch (error) {
    console.log(error, "error in createUser");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username }).select("+password");

    if (!user) {
      res.status(400).json({ msg: "User does not exist!" });
      return;
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "User does not exist!" });
      return;
    }

    sendCookies(res, user, `Welcome back ${user.username}!`);
  } catch (error) {
    console.log(error, "error in loginUser");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getMyProfile = async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
};

const logout = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(400).json({
      msg: "gka, login hai nhi logout krne chla hai, bhag bhusdi xdxd",
    });
    return;
  } else {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  }
};

module.exports = { createUser, loginUser, logout, getMyProfile };
