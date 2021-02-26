// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/controllers/auth.js

// import models
const User = require('../models/user')
const Route = require('../models/route');

exports.createRoute = async (req, res) => {

  try {
      res.json({
        msg: 'Middleware test successful'
      })
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server error');
  }
}

exports.getUserCreatedRoutes = async (req, res) => {

  const { username } = req.params

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

    if (!user) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'User does not exist'
      })
      return res
    }

    // retrieve routes created by user
    const results = await Route.find({ username: username})

    const routes = results.map((route) => {
      return {
        routeid: route.routeid,
        routedescription: route.routedescription,
        username: route.username,
        routetitle: route.routetitle,
        routetype: route.routetype,
        routetime: route.routetime,
        routedistance: route.routedistance,
        photos: route.photos,
        mapdata: route.mapdata
      }
    })

    // return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      data: routes,
      msg: 'user routes retrieved'
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