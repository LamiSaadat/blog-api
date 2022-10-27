const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

exports.authorize = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) throw new Error("You need to log in.");

  const token = authorization.split(" ")[1];

  if (token === null) return res.send("No token avaialable.");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "No token" });
    } else {
      req.decoded = decoded;
      console.log(req.decoded);
      next();
    }
  });
};

// exports.authorize = (req) => {
//   const authorization = req.headers["authorization"];
//   if (!authorization) throw new Error("You need to login");

//   //getting rid of Bearer from token
//   const token = authorization.split(" ")[1];

//   const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//   return userId;
// };
