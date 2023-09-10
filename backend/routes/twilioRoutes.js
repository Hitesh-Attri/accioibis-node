const express = require("express");
const { makeCall } = require("../controllers/makeCall");

const router = express.Router();

router.post("/call", makeCall);

module.exports = router;
