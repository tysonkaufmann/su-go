// boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/validators/auth.js
const { check } = require('express-validator')

exports.routeValidator = [
  check('routename')
    .not().isEmpty()
    .withMessage('Route name cannot be empty')
]
