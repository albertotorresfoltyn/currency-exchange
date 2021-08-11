const { code } = require("./code");

class Unauthorized extends Error {
  constructor(message = "Unauthorized", ...args) {
    super(message, ...args);
    this[code] = 401;
  }
}

module.exports = Unauthorized;
