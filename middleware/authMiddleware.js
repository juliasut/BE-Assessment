const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Check headers for authorization object for 'Bearer <token>'
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('No credentials provided');
  }

  // get token from the header
  const token = authHeader.split(' ')[1];

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user from the token and pass to next function on req object
    const { id } = decoded;
    req.user = { id };
    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = { protect };
