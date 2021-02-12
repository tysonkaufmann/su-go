// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/controllers/auth.js
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');

// import models
const User = require('../models/user')

exports.signup = async (req, res) => {
  // 1: destruct name, username, password
  var { username, password } = req.body

  try {
    // 2: check to see if username is in use
    const user = await User.findOne({ username })
    if (user) {
      return res.status(200).json({
        status: '200',
        success: 'false',
        msg: 'Username is already in use'
      })
    }

    // 3: create new user
    password = encrypt(password);
    const newUser = new User({ username, password });

    // 4: save user to DB
    newUser.save((err, success) => {
      if (err) {
        return res.status(200).json({
          status: '200',
          success: 'false',
          msg: err
        })
      }
      res.json({
        status: '200',
        success: 'true',
        msg: 'Registration success! Please sign in'
      })
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: '500',
      success: 'false',
      msg: 'Internal Server error'
    })
  }
}

exports.login = async (req, res) => {
  // 1: destruct email and password
  const { username, password } = req.body
  try {
    // 2: check if user exists
    const user = await User.findOne({ username })
    // 3: authenticate user
    if (!user || !user.authenticate(encrypt(password))) { // authenticate with user schema method
      return res.status(200).json({
        status: '200',
        success: 'false',
        msg: 'Username and password do not match'
      })
    }

    // create payload
    const payload = {
        username: username
    }

    // generate a token to send to client/react
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '10h' },
      (err, token) => {
        if (err){
          console.error(err)
          res.json({
            status: '500',
            success: 'false',
            err: 'Internal Server error'
          })
        }
        res.json({
          status: '200',
          success: 'true',
          token,
          expiresin: '10h',
          msg: 'Login successful'
        })
      }
    )
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      status: '500',
      success: 'false',
      msg: 'Internal Server error'
    })
  }
}

function encrypt(password)
{
    if (!password) return ''
    try {
      var encryptedPassword = sha1(password);
      return encryptedPassword;
    } catch (error) {
      return ''
    }
}
