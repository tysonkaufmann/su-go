const mongoose = require('mongoose'); // Connects to mongodb
process.env.PORT=9000
const supertest = require('supertest');
const app = require('./../../server.js') // Link to your server file
const request = supertest(app)

beforeAll(() => {
  // to suppress errors on edge test cases that are meant to throw errors for produciton teams
  console.error = function() {}
});

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
        "routeid": 0,
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
        "routeid": 1,
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

afterAll(() => {
  mongoose.connection.close()
  process.env.PORT=5000
});