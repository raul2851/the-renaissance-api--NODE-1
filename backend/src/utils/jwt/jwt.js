const jwt = require("jsonwebtoken");

const generateSign = (id, uniqueField) => {
  return jwt.sign({ id, uniqueField }, process.env.JWT_SECRET, { expiresIn: "25d" });
};

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = { generateSign, verifyJwt };
