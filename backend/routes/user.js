// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/routes/auth.js

const router = require('express').Router();

// import controller
const { signup, login, resetpassword, changepassword, getUserInformation } = require('../controllers/user');
const { auth } = require('../middleware/auth');

// @route   GET /api/userprofile/userinformation/:username
// @desc    Get user profile information
// @access  Private - Auth needed
router.get('/userinformation/:username',auth , getUserInformation);


// @route   POST /api/users/signup
// @desc    Register user
// @access  Public
router.post('/signup', signup);

// @route   POST /api/users/login
// @desc    Signin user
// @access  Public
router.post('/login', login);

// @route   POST /api/users/resetpassword
// @desc    Reset password request
// @access  Public
router.post('/resetpassword', resetpassword);

// @route   POST /api/users/changepassword
// @desc    Reset password request
// @access  Public
router.post('/changepassword', changepassword);

module.exports = router;
