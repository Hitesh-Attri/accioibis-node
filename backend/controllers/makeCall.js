const makeCall = async (req, res) => {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.calls
    .create({
      twiml: `<Response>
       <Say>Hi, I am Hitesh. Press 1 for option one. Press 2 for option two.</Say>
          <Pause length="1" />
          <Connect>
            <Stream url="wss://${req.headers.host}/api/streaming" />
          </Connect>
        </Response>`,
      to: `+91${req.body.phnNumber}`,
      from: process.env.TWILIO_PHN,
    })
    .then((call) => {
      console.log(call.sid);
      res.status(200).json({ msg: "Call initiated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Somthing went wrong!" });
    });
};

module.exports = { makeCall };
