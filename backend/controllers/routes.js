// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/controllers/auth.js

// import
const User = require('../models/user')
const Route = require('../models/route');
const Traffic = require('../models/traffic');
const {v4 : uuidv4} = require('uuid')


exports.routeTraffic = async (req, res) => {

  var { routeid } = req.params

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
        msg: 'Route not found'
      })
      return res
    }

    const alreadyExist = await Traffic.find({ routeid: routeid})
    var traffic = alreadyExist.length

    // return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      data : {
        traffic : traffic
      },
      msg: 'Traffic found successfully'
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



exports.endRoute = async (req, res) => {

  var { routeid } = req.params
  var { username } = req.body

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

    const alreadyExist = await Traffic.findOne({ username: username})

    if (!alreadyExist) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        msg: 'User is currently not on this route or it has exceeded the 10 hour route time limit'
      })
      return res
    }

    const isdeleted = await Traffic.findOneAndDelete({ username: username})

    // return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      msg: 'Route ended successfully'
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

exports.startRoute = async (req, res) => {

  var { routeid } = req.params
  var { username } = req.body

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

    const alreadyExist = await Traffic.findOne({ username: username})

    if (alreadyExist) {
      res.status(200);
      res.json({
        status: '200',
        success: 'false',
        data: alreadyExist,
        msg: 'User is already on a route, see data in the response'
      })
      return res
    }

    var trafficid = uuidv4()
    var starttime = Date.now();

    const newTrafficInfo = new Traffic({ username, routeid, trafficid, starttime });
    await newTrafficInfo.save();

    // return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      msg: 'Route started successfully'
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

  if(!username || !routetitle || !routetype || !routetime || !routedescription || !photos || !mapdata || !routedistance){
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
      data: {
        route : newRouteInfo
      },
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


exports.getAllRoutes = async (req, res) => {

  try {

    // retrieve routes created by user
    const results = await Route.find()

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
        mapdata: route.mapdata,
        votes: route.votes
      }
    })

    // return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      data: routes,
      msg: 'routes retrieved'
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
