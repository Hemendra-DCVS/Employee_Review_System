// controllers/feedback-controller.js
const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback'); // Assuming you've defined the model

// Display a list of all feedback
exports.feedbackList = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.render('feedback/list', { feedbacks });
  } catch (error) {
    // Handle errors
    res.status(500).send('An error occurred while fetching feedback.');
  }
};

// Display the details of a specific feedback
exports.feedbackDetail = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).send('Feedback not found.');
    }
    res.render('feedback/detail', { feedback });
  } catch (error) {
    // Handle errors
    res.status(500).send('An error occurred while fetching feedback details.');
  }
};

// Display a form to create new feedback
exports.feedbackCreateForm = (req, res) => {
  res.render('feedback/create');
};

// Handle the creation of new feedback
exports.feedbackCreate = async (req, res) => {
  const { reviewer, performanceReview, feedbackText } = req.body;
  try {
    await Feedback.create({ reviewer, performanceReview, feedbackText });
    res.redirect('/feedback'); // Redirect to the feedback list page
  } catch (error) {
    // Handle errors
    res.status(400).send('Failed to create feedback.');
  }
};

// Display a form to update feedback
exports.feedbackUpdateForm = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).send('Feedback not found.');
    }
    res.render('feedback/update', { feedback });
  } catch (error) {
    // Handle errors
    res.status(500).send('An error occurred while fetching feedback details for update.');
  }
};

// Handle the update of feedback
exports.feedbackUpdate = async (req, res) => {
  const feedbackId = req.params.id;
  const { reviewer, performanceReview, feedbackText } = req.body;
  try {
    await Feedback.findByIdAndUpdate(feedbackId, { reviewer, performanceReview, feedbackText });
    res.redirect('/feedback'); // Redirect to the feedback list page
  } catch (error) {
    // Handle errors
    res.status(400).send('Failed to update feedback.');
  }
};

// Handle the deletion of feedback
exports.feedbackDelete = async (req, res) => {
  const feedbackId = req.params.id;
  try {
    await Feedback.findByIdAndRemove(feedbackId);
    res.redirect('/feedback'); // Redirect to the feedback list page
  } catch (error) {
    // Handle errors
    res.status(400).send('Failed to delete feedback.');
  }
};
