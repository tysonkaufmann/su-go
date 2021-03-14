// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/routes/auth.js

const router = require('express').Router();

// import controller
const { createRoute, getRoute, getUserCreatedRoutes, deleteRoute } = require('../controllers/routes');

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

// @route   GET /api/routes/getroute/{ROUTEID}
// @desc    Gets all the data with an associated route
// @access  Public
router.get('/getroute/:routeid', getRoute);


// @route   POST /api/routes/{routeid}/delete
// @desc    Deletes the route that matches the routeid
// @access  Private - Auth needed
router.post('/:routeid/delete', auth, deleteRoute);

module.exports = router;
