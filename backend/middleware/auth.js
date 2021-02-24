// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/middleware/auth.js

const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = (req, res, next) => {
  // get token from header
  const token = req.header('x-auth-token')
  const username = req.header('x-auth-username')

  // check if token isn't present
  if (!username) {
    // return 401 unauthorized response
    return res.status(401).json({ msg: 'No username, authorization denied' })
  }

  // check if token isn't present
  if (!token) {
    // return 401 unauthorized response
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (username == decoded.username)
    {
      next()
    }
    else {
      res.status(401).json({ msg: 'Token is invalid' })
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Token is invalid' })
  }
}
