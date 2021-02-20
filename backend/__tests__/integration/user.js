const mongoose = require('mongoose'); // Connects to mongodb
const app = require('./../../server.js') // Link to your server file
const Verification = require('./../../models/verification')
const supertest = require('supertest');
const User = require('../../models/user.js');
const request = supertest(app)

beforeAll(() => {
  // to suppress errors on edge test cases that are meant to throw errors for produciton teams
  console.error = function() {}
});

it('Signup Endpoint Test - Successful Signup', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    username: "jonsnow",
    password: "WinterIsComing123",
    email: "Jon.Snow@stark.com",
    fullname: "Jon Snow",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("true")
  expect(response.body.msg).toBe("Registration success! Please sign in")

  // remove the test user
  await User.findOneAndDelete(
    { "username": "jonsnow" },
    { "sort": { "_id": -1 } }
  )

  done()
})

it('Signup Endpoint Test - Missing Username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    password: "WinterIsComing123",
    email: "Jon.Snow@stark.com",
    fullname: "Jon Snow",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")

  done()
})

it('Signup Endpoint Test - Missing Password', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    username: "jonsnow",
    email: "Jon.Snow@stark.com",
    fullname: "Jon Snow",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")

  done()
})

it('Signup Endpoint Test - Missing Email', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    username: "jonsnow",
    password: "WinterIsComing123",
    fullname: "Jon Snow",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")

  done()
})

it('Signup Endpoint Test - Missing Fullname', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    username: "jonsnow",
    password: "WinterIsComing123",
    email: "Jon.Snow@stark.com",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")

  done()
})

it('Signup Endpoint Test - Invalid Username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    username: "Jon Snow",
    password: "WinterIsComing123",
    email: "Jon.Snow@stark.com",
    fullname: "Jon Snow",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Username is invalid")

  done()
})

it('Signup Endpoint Test - User already exists', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    username: "Cheng",
    password: "Test123",
    email: "test@test.com",
    fullname: "C L",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Username is already in use")

  done()
})

it('Signup Endpoint Test - Invalid Password', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    username: "jonsnow",
    password: "WinterIsComing",
    email: "Jon.Snow@stark.com",
    fullname: "Jon Snow",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Password is invalid")

  done()
})

it('Signup Endpoint Test - Invalid Email', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);
  payload = {
    username: "jonsnow",
    password: "WinterIsComing123",
    email: "Jon.Snow@stark",
    fullname: "Jon Snow",
    profilepic: "FAKE BASE64 ENCODED STRING"
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Email is invalid")

  done()
})



it('Login Endpoint Test - Successful Login', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000);
  payload = {
    username : "aryastark",
    password : "Test123"
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("true")
  expect(response.body.msg).toBe("Login successful")
  done()
})

it('Login Endpoint Test - Username Incorrect', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000);
  payload = {
    username : "fakename",
    password : "test"
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Username and password do not match")
  done()
})

it('Login Endpoint Test - Password Incorrect', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul2",
    password : "Fakepass1"
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Username and password do not match")
  done()
})

it('Login Endpoint Test - No Username in Payload', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000);
  payload = {
    password : "fakepass"
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})

it('Login Endpoint Test - No Password in Payload', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000);
  payload = {
    username : "fakename"
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})

it('Reset Password Request Endpoint Test - Email Sent Succesfully', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul2"
  }
  const response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("true")
  expect(response.body.msg).toBe("Verification email sent successfully")
  done()
})

it('Reset Password Request Endpoint Test - No Username in Payload', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {}
  const response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})

it('Reset Password Request Endpoint Test - Unregistered Username in Payload', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    username : "fakename"
  }
  const response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("User does not exist")
  done()
})

it('Reset Password Endpoint Test - Bad Email Address of user', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul"
  }
  const response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Error sending email, user might have an invalid email on file")
  done()
})


it('Change Password Endpoint Test - No Username', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    newpassword : "test",
    verificationcode : "355455"
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})

it('Change Password Endpoint Test - No New Password', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul",
    verificationcode : "355455"
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})


it('Change Password Endpoint Test - No Verification Code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul",
    newpassword : "test",
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})


it('Change Password Endpoint Test - No Username and New Password', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    verificationcode : "355455"
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})


it('Change Password Endpoint Test - No Username and Verification Code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    newpassword : "test"
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})


it('Change Password Endpoint Test - No New Password and Verification Code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul",
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Bad Request")
  done()
})


it('Change Password Endpoint Test - Incorrect Verification Code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul2",
    newpassword : "Test123",
    verificationcode : "355455"
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Verification Code is incorrect, expired or already used")
  done()
})

it('Change Password Endpoint Test - Successful Password Change', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  const username = "aryastark"

  // send email
  payload = {
    username : username
  }
  var response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("true")
  expect(response.body.msg).toBe("Verification email sent successfully")

  // get verificaiton code
  const userVerify = await Verification.findOne({ username });
  const newpassword = "Test123"
  // try to reset password
  payload = {
    username : username,
    newpassword : newpassword,
    verificationcode : userVerify.code
  }
  response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("true")
  expect(response.body.msg).toBe("Password Changed Successfully, please log in")
  done()
})

it('Change Password Endpoint Test - Block Re-use of verificaiton code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000);
  const username = "aryastark"

  // send email
  payload = {
    username : username
  }
  var response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("true")
  expect(response.body.msg).toBe("Verification email sent successfully")

  // get verificaiton code
  const userVerify = await Verification.findOne({ username });
  const newpassword = "Test123"
  // try to reset password
  payload = {
    username : username,
    newpassword : newpassword,
    verificationcode : userVerify.code
  }
  response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("true")
  expect(response.body.msg).toBe("Password Changed Successfully, please log in")

  // try to reset password
  payload = {
    username : username,
    newpassword : newpassword,
    verificationcode : userVerify.code
  }
  response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Verification Code is incorrect, expired or already used")
  done()
})

it('Get User Information - No x-auth-username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "No username, authorization denied" }
  const response = await request.get('/api/userprofile/userinformation/sansastark')

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Information - No x-auth-token', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "No token, authorization denied" }
  const response = await request.get('/api/userprofile/userinformation/sansastark').set('x-auth-username', 'sansastark')

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Information - Wrong x-auth-token', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000);

  var expectedResponse = { "msg": "Token is invalid" }
  const response = await request.get('/api/userprofile/userinformation/sansastark').set('x-auth-username', 'sansastark').set('x-auth-token', "fake")

  expect(response.body.msg).toBe(expectedResponse.msg);
  done()
})

it('Get User Information - Wrong x-auth-username', async done => {
  // Sends POST Request to /signup endpoint
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
  const response = await request.get('/api/userprofile/userinformation/sansastark').set('x-auth-username', 'FAKEFAKE').set('x-auth-token', token)
  expect(response.body.msg).toBe(expectedResponse.msg);

  done()
})


it('Get User Information - Conflicting x-auth-username and userinformation/{username}', async done => {
  // Sends POST Request to /signup endpoint
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
  const response = await request.get('/api/userprofile/userinformation/jonsnow').set('x-auth-username', 'sansastark').set('x-auth-token', token)
  expect(response.body.msg).toBe(expectedResponse.msg);
  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);

  done()
})

it('Get User Information - Successful', async done => {
  // Sends POST Request to /signup endpoint
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
      "status": "200",
      "success": "true",
      "data": {
          "username": "sansastark",
          "fullname": "Jon Snow",
          "email": "Jon.Snow@stark.com",
          "totaldistancecomplete": 0,
          "totalroutescomplete": 0,
          "totalroutetime": "0",
          "profilepic": "FAKE BASE64 ENCODED STRING"
      },
      "msg": "User information sent"
  }
  const response = await request.get('/api/userprofile/userinformation/sansastark').set('x-auth-username', 'sansastark').set('x-auth-token', token)

  expect(response.body.status).toBe(expectedResponse.status);
  expect(response.body.success).toBe(expectedResponse.success);
  expect(response.body.data.username).toBe(expectedResponse.data.username);

  done()
})



afterAll(() => {
  mongoose.connection.close()
});
