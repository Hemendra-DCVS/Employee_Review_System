const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // Add other employee-related fields here
});

module.exports = mongoose.model('Employee', employeeSchema);
