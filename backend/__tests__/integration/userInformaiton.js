process.env.PORT=6000
const mongoose = require('mongoose'); // Connects to mongodb
const supertest = require('supertest');
const User = require('../../models/userInfo.js');
const app = require('./../../server.js') // Link to your server file
var request = supertest(app)

beforeAll(() => {
  // to suppress errors on edge test cases that are meant to throw errors for produciton teams
  console.error = function() {}

});

it('Get User Information - No x-auth-username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "No username, authorization denied" }
  const response = await request.get('/api/userprofile/userinformation/jonsnow2')

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Information - No x-auth-token', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "No token, authorization denied" }
  const response = await request.get('/api/userprofile/userinformation/jonsnow2').set('x-auth-username', 'jonsnow2')

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Information - Wrong x-auth-token', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "Token is invalid" }
  const response = await request.get('/api/userprofile/userinformation/jonsnow2').set('x-auth-username', 'jonsnow2').set('x-auth-token', "fake")

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Information - Wrong x-auth-username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  payload1 = {
    username : "jonsnow2",
    password : "WinterIsComing123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token
  var expectedResponse = { "msg": "Token is invalid" }
  const response = await request.get('/api/userprofile/userinformation/jonsnow2').set('x-auth-username', 'FAKEFAKE').set('x-auth-token', token)
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


it('Get User Information - Conflicting x-auth-username and userinformation/{username}', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  payload1 = {
    username : "jonsnow2",
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
  const response = await request.get('/api/userprofile/userinformation/jonsnow').set('x-auth-username', 'jonsnow2').set('x-auth-token', token)
  expect(response.body.msg).toBe(expectedResponse.msg);
  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);

  done()
})

it('Get User Information - Successful', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  payload1 = {
    username : "jonsnow2",
    password : "WinterIsComing123"
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe("true")
  expect(response2.body.msg).toBe("Login successful")

  var token = response2.body.token
  var expectedResponse = {
      "status": "200",
      "success": "true",
      "data": {
          "username": "jonsnow2",
          "fullname": "Jon Snow",
          "email": "Jon.Snow@stark.com",
          "totaldistancecomplete": 0,
          "totalroutescomplete": 0,
          "totalroutetime": "0",
          "profilepic": "FAKE BASE64 ENCODED STRING"
      },
      "msg": "User information sent"
  }
  const response = await request.get('/api/userprofile/userinformation/jonsnow2').set('x-auth-username', 'jonsnow2').set('x-auth-token', token)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.data.username).toBe(expectedResponse.data.username);

  done()
})


afterAll(() => {
  mongoose.connection.close()
  process.env.PORT=null
});
