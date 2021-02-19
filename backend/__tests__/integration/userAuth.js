const mongoose = require('mongoose'); // Connects to mongodb
const app = require('./../../server.js') // Link to your server file
const Verification = require('./../../models/verification')
const supertest = require('supertest');
const UserAuth = require('../../models/userAuth.js');
const User = require('../../models/userInfo.js');
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
  await UserAuth.findOneAndDelete(
    { "username": "jonsnow" },
    { "sort": { "_id": -1 } }
  )

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
    username : "Mitul2",
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
  const username = "Mitul2"

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
  const username = "Mitul2"

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



afterAll(() => {
  mongoose.connection.close()
});
