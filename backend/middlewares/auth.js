const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    // req.user = jwt.verify(token, 'some-secret-key');
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    next();
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
};
