const jwt = require("jsonwebtoken");
const jwt_secret = "anant_server";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const jwtToken = req.headers.authorization; // bearer token
  try {
    const decodedValue = jwt.verify(jwtToken, jwt_secret);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (e) {
    res.json({
      msg: "Incorrect inputs",
    });
  }
}

module.exports = userMiddleware;
