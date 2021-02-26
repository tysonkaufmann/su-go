// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/controllers/auth.js
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const {Email} = require('../services/email')
// import models
const User = require('../models/user')
const Verification = require('../models/verification')
//import validators
const { validateUsername, validatePassword, validateEmail } = require('../helpers/validators')


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
    const user = await User.findOne({ username })
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

exports.signup = async (req, res) => {

  var { username, password, email, fullname, profilepic } = req.body

  if(!username || !password || !email || !fullname)
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
    // check to see if username is valid
    if (!validateUsername(username)) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'Username is invalid'
      })
      return res
    }

    // check to see if username is in use
    const user = await User.findOne({ username })
    if (user) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'Username is already in use'
      })
      return res
    }

    // check to see if password is valid
    if (!validatePassword(password)) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'Password is invalid'
      })
      return res
    }

    // check to see if email is valid
    if (!validateEmail(email)) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'Email is invalid'
      })
      return res
    }

    // create new user
    password = encrypt(password);
    const newUserInfo = new User({ username, fullname, email, password });
    if (profilepic) {
      newUserInfo.profilepic = profilepic
    }

    // save userAuth and UserInfo to DB
    await newUserInfo.save();

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


// Handles the /changepassword endpoint
exports.changepassword = async (req, res) => {
  // destruct email and password
  const { username, verificationcode ,newpassword } = req.body;

  if(!username || !verificationcode || !newpassword)
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

        if(!userVerify || verificationcode != userVerify.code){
          res.status(200);
          res.json({
            status: '200',
            success: 'false',
            msg: "Verification Code is incorrect, expired or already used"
          })
          return res;
        }

        // check to see if the new password is valid
        if (!validatePassword(newpassword)) {
          res.status(200);
          res.json({
            status: '200',
            success: 'false',
            msg: 'New password is invalid'
          })
          return res
        }

        // change the users password
        user.changepassword(encrypt(newpassword));

        user.save((err, success) => {
          if (err) {
            console.error(err);
            res.status(200);
            res.json({
              status: '200',
              success: 'false',
              msg: 'An error occured while changing the password'
            })
            return res
          }
        })

        // lets try to delete the verification code so user cannot use it again incase it has not expired
        userVerify.deleteOne({ username: username }, function (err) {
          if(err){
            console.error(err);
            // verificaiton code was possibly autodeleted as it expired
            // no need to respond with an error message as password already changed
          }
        })

        res.status(200);
        res.json({
          status: '200',
          success: 'true',
          msg: 'Password Changed Successfully, please log in'
        })
        return res


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






// Handles the /login endpoint
exports.getUserInformation = async (req, res) => {

  // get the username from the URL
  const { username } = req.params

  // prevents bypassing auth with another usename
  if(!username)
  {
    res.status(404);
    res.json({
      status: '404',
      success: 'false',
      msg: 'Resource Not Found'
    })
    return res
  }

  // prevents bypassing auth with another usename
  if(username != req.header('x-auth-username'))
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
    const user = await User.findOne({ username })
    // find user
    if (!user) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'Username does not exist'
      })
      return res
    }

    // userExists, return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      data: {
        username : user.username,
        fullname: user.fullname,
        email: user.email,
        totaldistancecomplete: user.totaldistancecomplete,
        totalroutescomplete: user.totalroutescomplete,
        totalroutetime: user.totalroutetime,
        profilepic: user.profilepic,
    },
      msg: 'User information sent'
    })
    return res

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

// Handles the /updateuserinformation endpoint
exports.updateUserInformation = async (req, res) => {
  const { username, fullname, email, profilepic } = req.body;

  if (!username || !fullname || !email || !profilepic) {
    res.status(400);
    res.json({
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    })
    return res;
  }

  // prevents bypassing auth with another usename
  if(username != req.header('x-auth-username')) {
    res.status(400);
    res.json({
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    })
    return res
  }

  try {

    if (!validateEmail(email)) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'New email is invalid'
      })
      return res
    }

    const user = await User.findOne({ username });

    if (user) {
      const userInfo = {
        fullname: fullname,
        email: email,
        profilepic: profilepic
      }

      user.updateInfo(userInfo);

      user.save((err, success) => {
        if (err) {
          console.error(err);
          res.status(200);
          res.json({
            status: '200',
            success: 'false',
            msg: 'An error occured while updating user profile'
          })
          return res
        }
      })

      res.status(200);
        res.json({
          status: '200',
          success: 'true',
          msg: 'User profile updated successfully'
        })
      return res
    }
    else {
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
