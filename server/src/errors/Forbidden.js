const { code } = require("./code");

class Forbidden extends Error {
  constructor(message = "Forbidden", ...args) {
    super(message, ...args);
    this[code] = 403;
  }
}

module.exports = Forbidden;
