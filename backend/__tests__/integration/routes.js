const mongoose = require('mongoose'); // Connects to mongodb
const Route = require('./../../models/route')
process.env.PORT=9000
const supertest = require('supertest');
const app = require('./../../server.js') // Link to your server file
const request = supertest(app)

beforeAll(() => {
  // to suppress errors on edge test cases that are meant to throw errors for produciton teams
  console.error = function() {}
});

it('Delete Routes - Successful', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "200",
    "success": "true",
    "msg": "Route Successfully Created"
  }
  var response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  var route = await Route.findOne({ "username": "aryastark" })

  var payload2 = { username : "aryastark"}

  var expectedResponse2 = {
    "status": "200",
    "success": "true",
    "msg": "Route deleted successfully"
  }
  var response3 = await request.post('/api/routes/'+ route.routeid +'/delete').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload2)

  expect(response3.body.status).toBe(expectedResponse2.status);
  expect(response3.body.success).toBe(expectedResponse2.success);
  expect(response3.body.msg).toBe(expectedResponse2.msg);

  done()
})



it('Delete Routes - Route Not Found', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var payload2 = { username : "aryastark"}

  var expectedResponse2 = {
    "status": "404",
    "success": "false",
    "msg": "Route not found"
  }

  var response3 = await request.post('/api/routes/fakefakefake/delete').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload2)

  expect(response3.body.status).toBe(expectedResponse2.status);
  expect(response3.body.success).toBe(expectedResponse2.success);
  expect(response3.body.msg).toBe(expectedResponse2.msg);

  done()
})


it('Delete Routes - Conflicting Usernames', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var payload2 = { username : "fakefakefake"}

  var expectedResponse2 = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request, username in the body does not match x-auth-username"
  }

  var response3 = await request.post('/api/routes/fakefakefake/delete').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload2)

  expect(response3.body.status).toBe(expectedResponse2.status);
  expect(response3.body.success).toBe(expectedResponse2.success);
  expect(response3.body.msg).toBe(expectedResponse2.msg);

  done()
})


it('Delete Routes - No Username', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var payload2 = { fake : "aryastark"}

  var expectedResponse2 = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }

  var response3 = await request.post('/api/routes/fakefakefake/delete').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload2)

  expect(response3.body.status).toBe(expectedResponse2.status);
  expect(response3.body.success).toBe(expectedResponse2.success);
  expect(response3.body.msg).toBe(expectedResponse2.msg);

  done()
})


it('Create Routes - Successful', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "200",
    "success": "true",
    "msg": "Route Successfully Created"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  await Route.findOneAndDelete(
    { "username": "aryastark" },
    { "sort": { "_id": -1 } })

  done()
})


it('Create Routes - Missing Username', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})

it('Create Routes - Missing Route Description', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})

it('Create Routes - Missing Route Type', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


it('Create Routes - Missing Title', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


it('Create Routes - No Route Distance', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})

it('Create Routes - Route Distance Wrong Format', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": "2000",
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


it('Create Routes - Route Photos Missing', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


it('Create Routes - Route Photos Wrong Format', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": "",
    "mapdata": {
      "coordinates": [
        200,
        200
      ],
      "type": "Point"
    }
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


it('Create Routes - Route Map Data Missing', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})

it('Create Routes - Wrong Route Map Format', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "aryastark",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token

  var payload = {

    "routedescription": "test description 2",
    "username": "aryastark",
    "routetype" : "bike",
    "routetitle": "test route 2",
    "routetime": "test time 2",
    "routedistance": 2000,
    "photos": [
      "fake photo",
      "another fake photo"
    ],
    "mapdata": ""
  }

  var expectedResponse = {
    "status": "400",
    "success": "false",
    "msg": "Bad Request"
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


it('Get User Created Routes - No x-auth-username', async done => {
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "No username, authorization denied" }
  const response = await request.get('/api/routes/usercreatedroutes/sansastark')

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Created Routes - No x-auth-token', async done => {
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "No token, authorization denied" }
  const response = await request.get('/api/routes/usercreatedroutes/sansastark').set('x-auth-username', 'sansastark')

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Created Routes - Wrong x-auth-token', async done => {
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "Token is invalid" }
  const response = await request.get('/api/routes/usercreatedroutes/sansastark').set('x-auth-username', 'sansastark').set('x-auth-token', "fake")

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Created Routes - Wrong x-auth-username', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "sansastark",
    password : "WinterIsComing123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token
  var expectedResponse = { "msg": "Token is invalid" }
  const response = await request.get('/api/routes/usercreatedroutes/sansastark').set('x-auth-username', 'FAKEFAKE').set('x-auth-token', token)
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})

it('Get User Created Routes - Conflicting x-auth-username and usercreatedroutes/{username}', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "sansastark",
    password : "WinterIsComing123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token
  var expectedResponse = {
      "status": "400",
      "success": "false",
      "msg": "Bad Request"
  }
  const response = await request.get('/api/routes/usercreatedroutes/jonsnow').set('x-auth-username', 'sansastark').set('x-auth-token', token)
  expect(response.body.msg).toBe(expectedResponse.msg);
  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);

  done()
})

it('Get User Created Routes - Successful', async done => {
  jest.setTimeout(30000);

  payload1 = {
    username : "Cheng",
    password : "Test123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token
  var expectedResponse = {
    "status": "200",
    "success": "true",
    "data": [
      {
        "routeid": "0",
        "routedescription": "test description 1",
        "username": "Cheng",
        "routetitle": "test route 1",
        "routetype": "test type 1",
        "routetime": "test time 1",
        "routedistance": 1000,
        "photos": [
          "fake photo",
          "another fake photo"
        ],
        "mapdata": {
          "coordinates": [
            100,
            100
          ],
          "type": "Point"
        }
      },
      {
        "routeid": "1",
        "routedescription": "test description 2",
        "username": "Cheng",
        "routetitle": "test route 2",
        "routetype": "test type 2",
        "routetime": "test time 2",
        "routedistance": 2000,
        "photos": [
          "fake photo",
          "another fake photo"
        ],
        "mapdata": {
          "coordinates": [
            200,
            200
          ],
          "type": "Point"
        }
      }
    ],
    "msg": "user routes retrieved"
  }
  const response = await request.get('/api/routes/usercreatedroutes/Cheng').set('x-auth-username', 'Cheng').set('x-auth-token', token)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.data[0].username).toBe(expectedResponse.data[0].username);
  expect(response.body.data[0].routeid).toBe(expectedResponse.data[0].routeid);
  expect(response.body.data[0].routedescription).toBe(expectedResponse.data[0].routedescription);
  expect(response.body.data[0].routetitle).toBe(expectedResponse.data[0].routetitle);
  expect(response.body.data[0].routetype).toBe(expectedResponse.data[0].routetype);
  expect(response.body.data[0].routetime).toBe(expectedResponse.data[0].routetime);
  expect(response.body.data[0].routedistance).toBe(expectedResponse.data[0].routedistance);
  expect(response.body.data[1].username).toBe(expectedResponse.data[1].username);
  expect(response.body.data[1].routeid).toBe(expectedResponse.data[1].routeid);
  expect(response.body.data[1].routedescription).toBe(expectedResponse.data[1].routedescription);
  expect(response.body.data[1].routetitle).toBe(expectedResponse.data[1].routetitle);
  expect(response.body.data[1].routetype).toBe(expectedResponse.data[1].routetype);
  expect(response.body.data[1].routetime).toBe(expectedResponse.data[1].routetime);
  expect(response.body.data[1].routedistance).toBe(expectedResponse.data[1].routedistance);

  done()
})


it('Get Routes - Successful', async done => {
  jest.setTimeout(30000);

  var expectedResponse = {
    "status": "200",
    "success": "true",
    "data":
      {
        "routeid": "1",
        "routedescription": "test description 2",
        "username": "Cheng",
        "routetitle": "test route 2",
        "routetype": "test type 2",
        "routetime": "test time 2",
        "routedistance": 2000,
        "photos": [
          "fake photo",
          "another fake photo"
        ],
        "mapdata": {
          "coordinates": [
            200,
            200
          ],
          "type": "Point"
        }
      },
    "msg": "user routes retrieved"
  }
  const response = await request.get('/api/routes/1')

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.data.username).toBe(expectedResponse.data.username);
  expect(response.body.data.routeid).toBe(expectedResponse.data.routeid);
  expect(response.body.data.routedescription).toBe(expectedResponse.data.routedescription);
  expect(response.body.data.routetitle).toBe(expectedResponse.data.routetitle);
  expect(response.body.data.routetype).toBe(expectedResponse.data.routetype);
  expect(response.body.data.routetime).toBe(expectedResponse.data.routetime);
  expect(response.body.data.routedistance).toBe(expectedResponse.data.routedistance);

  done()
})


it('Get Routes - No Route Found', async done => {
  jest.setTimeout(30000);

  var expectedResponse = {
    "status": "404",
    "success": "false",
    "msg": "Route does not exist"
  }
  const response = await request.get('/api/routes/fakefakefake')

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


afterAll(() => {
  mongoose.connection.close()
  process.env.PORT=5000
});
