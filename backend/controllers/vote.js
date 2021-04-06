// import
const User = require('../models/user')
const Route = require('../models/route');


exports.vote = async (req, res) => {

  var { routeid } = req.params
  var { username, score } = req.body

  if(!routeid || !username || !score || !Number.isInteger(score) || score < 0 || score > 5)
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
    var route = await Route.findOne({ routeid: routeid})


    if (!route) {
      res.status(404);
      res.json({
        status: '404',
        success: 'false',
        msg: 'Route not found'
      })
      return res
    }


    found = false
    for(i = 0; i < route.votes.length; i++)
    {
      if(route.votes[i]["username"] == username)
      {
        route.votes[i]["score"] = score
        found = true
        break
      }
    }

    if(!found)
    {
      route.votes.push({"username": username, "score": score})
    }

    route.markModified('votes')
    await route.save();

    // return the data
    res.status(200);
    res.json({
      status: '200',
      success: 'true',
      data: {
        route : route
      },
      msg: 'Vote added successfully'
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
