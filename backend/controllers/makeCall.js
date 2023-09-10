const makeCall = async (req, res) => {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.calls
    .create({
      twiml: "<Response><Say>Hii I am Hitesh!</Say></Response>",
      to: "+919306339650",
      from: process.env.TWILIO_PHN,
    })
    .then((call) => {
      console.log(call.sid);
      res.send(call.sid);
    })
    .catch((err) => {
      console.log(err);
      req.send(err);
    });
};

module.exports = { makeCall };
