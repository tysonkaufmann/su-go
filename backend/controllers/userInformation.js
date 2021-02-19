// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/controllers/auth.js

// import models
const User = require('../models/userInfo')

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
