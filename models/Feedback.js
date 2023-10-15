const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  performanceReview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PerformanceReview',
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  // Add other feedback-related fields here
});

module.exports = mongoose.model('Feedback', feedbackSchema);
