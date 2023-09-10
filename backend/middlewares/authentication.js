const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ success: false, msg: "You need to login first!" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
};

module.exports = { isAuthenticated };
