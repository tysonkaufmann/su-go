// boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/validators/auth.js
const { check } = require('express-validator')

exports.userAuthValidator = [
  check('username')
    .not().isEmpty()
    .withMessage('Must be a valid username'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]
