// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details from database based on decoded token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

module.exports = { protect };




/* // middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const CaretakerProfile = require('../models/CaretakerProfile'); // Adjust based on your model

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    req.user = await CaretakerProfile.findById(decoded.id); // Fetch user based on decoded token
    
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = { protect };
*/