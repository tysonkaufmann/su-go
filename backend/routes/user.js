// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/routes/auth.js

const router = require('express').Router();
let User = require('../models/user');

// import controller
const { signup, login } = require('../controllers/userAuth');


// @route   POST /api/users/signup
// @desc    Register user
// @access  Public
router.post('/signup', signup);

// @route   POST /api/users/signin
// @desc    Signin user
// @access  Public
router.post('/login', login);

module.exports = router;
