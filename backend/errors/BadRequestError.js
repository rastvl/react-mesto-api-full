// https://developer.mozilla.org/ru/docs/Web/HTTP/Status/400
module.exports = class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 400;
  }
};
