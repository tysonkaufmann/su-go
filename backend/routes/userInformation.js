// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/routes/auth.js

const router = require('express').Router();

// import controller
const { getUserInformation } = require('../controllers/userInformation');
const { auth } = require('../middleware/auth');

// @route   GET /api/userprofile/userinformation/:username
// @desc    Get user profile information
// @access  Private - Auth needed
router.get('/userinformation/:username',auth , getUserInformation);

module.exports = router;
