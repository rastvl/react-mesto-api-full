// https://developer.mozilla.org/ru/docs/Web/HTTP/Status/401
module.exports = class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 401;
  }
};
