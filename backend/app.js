const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes here
app.use("/api/twilio", require("./routes/twilioRoutes"));

app.get("/", (req, res) => {
  res.json({ msg: "server up and running... weww" });
});

app.all("*", (req, res) => {
  res.status(404).json({ msg: "Not found" });
});

module.exports = { app };
