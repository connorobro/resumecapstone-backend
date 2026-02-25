const jwt = require('jsonwebtoken');

/**
 * JWT authentication middleware.
 * Verifies the Bearer token in the Authorization header and attaches
 * the decoded payload to req.user.
 *
 * TODO: When RDS is available, optionally validate that the user ID
 * still exists in the database before granting access.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'stub_secret');
    req.user = decoded; // { userId, username, iat, exp }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = authenticateToken;
