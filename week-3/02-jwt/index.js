const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

function isValidEmail(tryEmail) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(tryEmail);
}

function signJwt(username, password) {
  // Your code here
  if (!isValidEmail(username) || password.length < 6) return null;
  var token = jwt.sign({ username: username }, jwtPassword);
  return token;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */

function verifyJwt(token) {
  // Your code here
  try {
    if (jwt.verify(token, jwtPassword)) return true;
  } catch {
    return false;
  }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */

function decodeJwt(token) {
  // Your code here
  // Check if the token is a valid JWT format
  if (typeof token !== "string" || token.split(".").length !== 3) return false;

  try {
    // Split the token into parts
    const [, payload] = token.split(".");

    // Base64 decode the payload
    const decodedPayload = atob(payload);

    // Parse the decoded payload into a JSON object
    const parsedPayload = JSON.parse(decodedPayload);

    return true;
  } catch (error) {
    // If an error occurs (e.g., invalid base64 or JSON), return false
    return false;
  }
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
