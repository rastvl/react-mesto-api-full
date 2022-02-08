// https://developer.mozilla.org/ru/docs/Web/HTTP/Status/409
module.exports = class ConflictError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 409;
  }
};
