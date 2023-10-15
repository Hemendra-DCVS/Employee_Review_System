// routes/home-router.js
const express = require('express');
const router = express.Router();


// Define your homepage route
router.get('/', (req, res) => {
  // Render your homepage view (e.g., home.ejs)
  res.render('home');
});



// Route requests starting with /employee to the employee router
router.use('/admin', require('./employee-router'));

// Route requests starting with /performance-review to the performance review router
router.use('/performance-review', require('./performance-review-router'));

// Route requests starting with /feedback to the feedback router
router.use('/feedback', require('./feedback-router'));

// Redirect requests to the 'auth-router'
router.use('/auth', require('./auth-router'));

// Define a route to render the login page
router.get('/login', (req, res) => {
  // Render the login view (e.g., login.ejs)
  res.render('login', );
});
// Define a route to render the registration page
router.get('/register', (req, res) => {
  // Render the registration view (e.g., register.ejs)
  res.render('register',);
});


const mongoose = require('mongoose');
const PerformanceReview = mongoose.model('PerformanceReview'); // Replace with the actual model name
const Employee = mongoose.model('Employee');
const Feedback = mongoose.model('Feedback');

// Define the /dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.session.passport.user; // Assuming this is the MongoDB ObjectId

    if (!userId) {
      return res.status(400).send('User ID is missing.');
    }

    // Fetch user data from the database based on the ObjectId
    const user = await Employee.findById(userId);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    if (user.isAdmin) {
      // Fetch admin-specific data
      const employees = await Employee.find();
      const performanceReviews = await PerformanceReview.find();

      // Render the admin dashboard view
      res.render('admin-dashboard', { employees, performanceReviews });
    } else {
      // Fetch employee-specific data
      const performanceReviews = await PerformanceReview.find({ assignedTo: userId });

      // Render the employee dashboard view
      res.render('employee-dashboard', { performanceReviews });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while rendering the dashboard.');
  }
});






module.exports = router;
