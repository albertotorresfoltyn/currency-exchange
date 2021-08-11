const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateJWTToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_AUTH_SECRET, {
    expiresIn: "4h",
  });
  return token;
};

// eslint-disable-next-line no-return-await
const hashPassword = async (password) => await bcrypt.hash(password, 8);

const isMatchPassword = async (passwordInp, userDBPass) =>
  // eslint-disable-next-line no-return-await
  await bcrypt.compare(passwordInp, userDBPass);

const verifyAndDecode = (token) =>
  jwt.verify(token, process.env.JWT_AUTH_SECRET);

module.exports = {
  generateJWTToken,
  hashPassword,
  isMatchPassword,
  verifyAndDecode,
};
