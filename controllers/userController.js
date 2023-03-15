//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

// Public POST api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error(`Please add all fields ${username}`);
  }

  // Check if user's email is unique
  const userEmailExists = !!(await User.findOne({ email }));

  if (userEmailExists) {
    res.status(400);
    throw new Error('Email already exists.');
  }

  // Hash password with 10 rounds of salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Register new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ msg: "user created", token: generateToken(user.id) });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Public POST api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error(`Please add all fields ${username}`);
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      // id: user.id,
      // username: user.username,
      // email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Private GET api/users/me
const getMe = asyncHandler(async (req, res) => {
  return res.json({ message: "me" });
});

module.exports = { registerUser, loginUser, getMe };
