const express = require('express');
const router = express.Router();
const PerformanceReview = require('../models/performanceReview');
const Employee = require('../models/employee');

router.get('/view-performance-reviews', async (req, res) => {
    try {
      const performanceReviews = await PerformanceReview.find().populate('assignedTo');
      res.render('admin-dashboard', { performanceReviews });
    } catch (error) {
      // Handle errors
      res.redirect('back');
    }
  });
  
  // Add Performance Review
  router.get('/add-performance-review', (req, res) => {
    res.redirect('back');
  });
  
  router.post('/add-performance-review', async (req, res) => {
    try {
      const { title, description, assignedTo } = req.body;
      const performanceReview = new PerformanceReview({ title, description, assignedTo });
      await performanceReview.save();
      res.redirect('back');
    } catch (error) {
      // Handle errors
      res.redirect('back');
    }
  });
  
  // Update Performance Review
  router.get('/update-performance-review/:id', async (req, res) => {
    res.redirect('back');
  });
  
  router.post('/update-performance-review/:id', async (req, res) => {
    try {
      const { title, description } = req.body;
      const performanceReview = await PerformanceReview.findById(req.params.id);
      performanceReview.title = title;
      performanceReview.description = description;
      await performanceReview.save();
      res.redirect('back');
    } catch (error) {
      // Handle errors
      res.redirect('back');
    }
  });
  
  // Assign Employees to Participate in a Performance Review
  router.get('/assign-employees/:id', async (req, res) => {
    try {
      // You will need to fetch a list of employees to assign to the performance review
      const employees = await Employee.find();
      const performanceReview = await PerformanceReview.findById(req.params.id);
    
      res.render('assign-employees-form', { employees, performanceReview });
    } catch (error) {
      // Handle errors
      res.redirect('back');
    }
  });
  
  router.post('/assign-employees/:id', async (req, res) => {
    try {
      const { assignedEmployees } = req.body;
      const performanceReview = await PerformanceReview.findById(req.params.id);
      performanceReview.assignedTo = assignedEmployees;
      await performanceReview.save();
      res.redirect('back');
    } catch (error) {
      // Handle errors
      res.redirect('back');
    }
  });
  
  module.exports = router;