const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if header exists and starts with Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Authorization required');
  }

  // Get token
  const token = authorization.replace('Bearer ', '');

  // Verify token
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    throw new AuthorizationError('Not authorized');
  }
  req.user = payload;
  next(); // sending the request to the next middleware
};

module.exports = auth;
