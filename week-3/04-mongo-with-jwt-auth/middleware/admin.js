const jwt = require("jsonwebtoken");
const jwt_secret = "anant_server";

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const jwtToken = req.headers.authorization; // token
  console.log("jwt token: " + jwtToken);
  try {
    const decodedValue = jwt.verify(jwtToken, jwt_secret);
    console.log("decoded: " + decodedValue.username);
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

module.exports = adminMiddleware; 

