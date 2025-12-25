const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Decode token to get User ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Allow them to pass
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };