const { sign } = require("jsonwebtoken");

const createAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const sendAccessToken = (res, req, accessToken) => {
  res.send({
    accessToken,
    email: req.body.email,
  });
};

module.exports = {
  createAccessToken,
  sendAccessToken,
};
