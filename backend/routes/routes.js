// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/routes/auth.js

const router = require('express').Router();

// import controller
const { createRoute } = require('../controllers/routes');

// import validators
const {routeValidator} = require('../validators/routes');

// import middleware
const { auth } = require('../middleware/auth')


// @route   POST /api/routes/createroute
// @desc    creates a route
// @access  Public
router.post('/createroute', routeValidator, auth, createRoute);

module.exports = router;
