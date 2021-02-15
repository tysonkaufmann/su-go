// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/controllers/auth.js
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const {Email} = require('../services/email')
// import models
const User = require('../models/userInfo')
const UserAuth = require('../models/userAuth')
const Verification = require('../models/verification')

exports.signup = async (req, res) => {
  // destruct name, username, password
  var { username, password, email } = req.body
  if(!username || !password || !email)
  {
    res.status(400);
    res.json({
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    })
    return res
  }
  try {
    // check to see if username is in use
    const user = await UserAuth.findOne({ username })
    if (user) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'Username is already in use'
      })
      return res
    }

    // 3: create new user
    password = encrypt(password);
    const newUserAuth = new UserAuth({ username, password});
    // *********** For CHENG - add additional fields in the userInfo not userAuth (please see diagram)
    // *********** Add those fields in backend/models/userInfo.js too
    const newUserInfo = new User({ username, email });
    // save userAuth and UserInfo to DB
    newUserAuth.save((err, success) => {
      if (err) {
        res.status(200);
        res.json({
          status: '200',
          success: 'false',
          msg: err
        })
        return res
      }
    })
    newUserInfo.save((err, success) => {
      if (err) {
        res.status(200);
        res.json({
          status: '200',
          success: 'false',
          msg: err
        })
        return res
      }
    })

    res.status(200);
    return res.json({
      status: '200',
      success: 'true',
      msg: 'Registration success! Please sign in'
    })
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({
      status: '500',
      success: 'false',
      msg: 'Internal Server error'
    })
    return res
  }
}


// Handles the /login endpoint
exports.login = async (req, res) => {
  // destruct email and password
  const { username, password } = req.body

  if(!username || !password)
  {
    res.status(400);
    res.json({
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    })
    return res
  }

  try {
    // check if user exists
    const user = await UserAuth.findOne({ username })
    // authenticate user
    if (!user || !user.authenticate(encrypt(password))) { // authenticate with user schema method
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'Username and password do not match'
      })
      return res
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
          res.status(500);
          res.json({
            status: '500',
            success: 'false',
            err: 'Internal Server error'
          })
          return res
        }
        res.status(200);
        res.json({
          status: '200',
          success: 'true',
          token,
          expiresin: '10h',
          msg: 'Login successful'
        })
        return res
      }
    )
  } catch (err) {
    console.error(err)
    res.status(500);
    res.json({
      status: '500',
      success: 'false',
      msg: 'Internal Server error'
    })
    return res
  }
}


// Handles the /resetpassword endpoint
exports.resetpassword = async (req, res) => {
  // destruct email and password
  const { username } = req.body;

  if(!username)
  {
    res.status(400);
    res.json({
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    })
    return res;
  }

  try {
    // check if user exists
    const user = await User.findOne({ username });

    if (user) {
        // check if a previous verification exists
        const userVerify = await Verification.findOne({ username });

        if(userVerify){
          // delete the current verification code
          userVerify.deleteOne({ username: username }, function (err) {
            if(err){
              console.error(err);
              res.status(200);
              res.json({
                status: '200',
                success: 'false',
                msg: "User already has a verification code, request to try again in 5 mins"
              })
              return res;
            }
          });
        }


        // generate a new verification code and send it
        try {
          var emailService = new Email();
          var code = await emailService.send(user.email)
        } catch (e) {
          console.error(e);
          res.status(200);
          res.json({
            status: '200',
            success: 'false',
            msg: "Error sending email, user might have an invalid email on file"
          })
          return res;
        }

        // this error has been logged in email service already
        if(code == null)
        {
          res.status(200);
          res.json({
            status: '200',
            success: 'false',
            msg: 'An error occured with the email service unable to send email'
          })
        }

        // save verification code and respond to API request
        const newUserVerification = new Verification({ username, code });
        newUserVerification.save((err, success) => {
          if (err) {
            console.error(err);
            res.status(200);
            res.json({
              status: '200',
              success: 'false',
              msg: err
            })
            return res
          }
          res.status(200);
          res.json({
            status: '200',
            success: 'true',
            msg: 'Verification email sent successfully'
          })
          return res
        })

    }else {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'User does not exist'
      })
      return res
    }

  } catch (err) {
    console.error(err)
    res.status(500);
    res.json({
      status: '500',
      success: 'false',
      msg: 'Internal Server error'
    })
    return res
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
exports.encrypt = encrypt;
