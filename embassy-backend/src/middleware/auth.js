const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  console.log('Auth middleware called');
  const token = req.header('x-auth-token');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    console.log('Token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    if (decoded.user) {
      // Admin token structure
      req.user = decoded.user;
    } else {
      // Regular user token structure
      req.user = decoded;
    }
    
    console.log('User set in request:', req.user);
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};