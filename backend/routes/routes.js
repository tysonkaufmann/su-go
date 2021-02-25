// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/routes/auth.js

const router = require('express').Router();

// import controller
const { createRoute, getUserCreatedRoutes } = require('../controllers/routes');

// import middleware
const { auth } = require('../middleware/auth')

// @route   GET /api/routes/usercreatedroutes/:username
// @desc    Get user created routes
// @access  Private - Auth needed
router.get('/usercreatedroutes/:username', auth, getUserCreatedRoutes);



// @route   POST /api/routes/createroute
// @desc    creates a route
// @access  Public
router.post('/createroute', auth, createRoute);

module.exports = router;
