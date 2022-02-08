// https://developer.mozilla.org/ru/docs/Web/HTTP/Status/403
module.exports = class ForbiddenError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 403;
  }
};
