// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/routes/auth.js

const router = require('express').Router();

// import controller
const { createRoute, getRoute, getUserCreatedRoutes, deleteRoute, startRoute, endRoute } = require('../controllers/routes');

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

// @route   GET /api/routes/{ROUTEID}
// @desc    Gets all the data with an associated route
// @access  Public
router.get('/:routeid', getRoute);


// @route   POST /api/routes/{routeid}/delete
// @desc    Deletes the route that matches the routeid
// @access  Private - Auth needed
router.post('/:routeid/delete', auth, deleteRoute);

// @route   POST /api/routes/startRoute
// @desc    Starts a route
// @access  Private - Auth needed
router.post('/:routeid/startroute', auth, startRoute);

// @route   POST /api/routes/startRoute
// @desc    Starts a route
// @access  Private - Auth needed
router.post('/:routeid/endroute', auth, endRoute);


module.exports = router;
