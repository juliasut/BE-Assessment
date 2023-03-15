const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
