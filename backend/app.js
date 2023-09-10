const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { VoiceResponse } = require("twilio").twiml;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    try {
      const msg = JSON.parse(message);
      switch (msg.event) {
        case "connected":
          console.log("A new call has connected");

          break;
        case "start":
          console.log("Starting media stream");

          break;
        case "media":
          console.log("Receiving audio");
          break;
        case "stop":
          console.log("Call has ended");
          // recognizeStream.destroy();
          break;
      }
    } catch (error) {
      console.log("default case");
      ws.send(`Event not supported ${message}`);
    }
  });
  ws.send("Hi there, I am a WebSocket server");
});

// using routes here
app.use("/api/twilio", require("./routes/twilioRoutes"));

app.get("/", (req, res) => {
  res.json({ msg: "server working" });
});

// this api will work when a call is initiated from a given numbmer to the twilio number
app.post("/api/streaming", (req, res) => {
  console.log("api/streaming post request");
  res.set("Content-Type", "text/xml");
  const twimlResponse = `<Response>
      <Start>
        <Connect>
          <Stream url="wss://${req.headers.host}/api/streaming" />
        </Connect>
        </Start>
        <Say>
          I will stream the next 60 seconds of audio through your websocket
        </Say>
        <Pause length="60" />
    </Response>`;
  res.send(twimlResponse);
});

app.post("/handle-keypress", (req, res) => {
  const twiml = new VoiceResponse();
  const userResponse = req.body.Digits;
  console.log(req.body);

  switch (userResponse) {
    case "1":
      twiml.say("You pressed 1. Option one is selected.");
      break;
    case "2":
      twiml.say("You pressed 2. Option two is selected.");
      break;
    default:
      twiml.say("Invalid input. Please try again.");
  }
  res.type("text/xml");
  res.send(twiml.toString());
});

app.all("*", (req, res) => {
  res.status(404).json({ msg: "Not found" });
});

module.exports = { app, server };
