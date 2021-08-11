const { code } = require("./code");

class BadRequest extends Error {
  constructor(message = "Bad Request", ...args) {
    super(message, ...args);
    this[code] = 400;
  }
}

module.exports = BadRequest;
