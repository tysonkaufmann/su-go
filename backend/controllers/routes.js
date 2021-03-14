// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/controllers/auth.js

// import
const User = require('../models/user')
const Route = require('../models/route');
const {v4 : uuidv4} = require('uuid')



exports.deleteRoute = async (req, res) => {

  var { routeid } = req.params
  var { username } = req.body

  // prevents bypassing auth with another usename
  if(!routeid || !username)
  {
    res.status(400);
    res.json({
      status: '400',
      success: 'false',
      msg: 'Bad Request'
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
      msg: 'Bad Request, username in the body does not match x-auth-username'
    })
    return res
  }

  try {
    // check if route exists
    const route = await Route.findOne({ routeid: routeid})

    if (!route) {
      res.status(404);
      res.json({
        status: '404',
        success: 'false',
        msg: 'Route not found'
      })
      return res
    }

    const routeDelete = await Route.findOneAndDelete({ routeid: routeid})

    // return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      msg: 'Route deleted successfully'
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



exports.getRoute = async (req, res) => {

  const { routeid } = req.params

  // prevents bypassing auth with another usename
  if(!routeid)
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
    // check if route exists
    const route = await Route.findOne({ routeid: routeid})

    if (!route) {
      res.status(404);
      res.json({
        status: '404',
        success: 'false',
        msg: 'Route does not exist'
      })
      return res
    }

    var data = {
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

    // return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      data: data,
      msg: 'Route retrieved'
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


exports.createRoute = async (req, res) => {

  var { username, routetitle, routetype, routetime, routedescription, photos, mapdata, routedistance } = req.body

  if(!username || !routetitle || !routetype || !routetime || !routedescription || !photos || !mapdata || !routedistance || typeof username != 'string' ||
    typeof routetitle != 'string' || typeof routetype != 'string' ||typeof routetime != 'string' || typeof routedescription != 'string' || typeof photos != 'object'
    ||typeof mapdata != 'object' ||typeof routedistance != 'number' || !mapdata['coordinates'] || !mapdata['type'] || typeof mapdata['coordinates'] != 'object' ||
      typeof mapdata['type'] != 'string'){
    res.status(400);
    res.json({
      status: '400',
      success: 'false',
      msg: 'Bad Request'
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
      msg: 'Bad Request, username in the body does not match x-auth-username'
    })
    return res
  }

  try {
    var routeid = uuidv4()
    const newRouteInfo = new Route({ routeid, username, routetitle, routetype, routetime, routedescription, photos, mapdata, routedistance });

    // save route information
    await newRouteInfo.save();

    res.status(200);
    return res.json({
      status: '200',
      success: 'true',
      msg: 'Route Successfully Created'
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
