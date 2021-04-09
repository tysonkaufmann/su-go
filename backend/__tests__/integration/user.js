const mongoose = require('mongoose') // Connects to mongodb
const Verification = require('./../../models/verification')
const User = require('../../models/user.js')
const Route = require('./../../models/route')
const Traffic = require('./../../models/traffic')
process.env.PORT = 7000
const supertest = require('supertest')
const app = require('./../../server.js') // Link to your server file
const request = supertest(app)

beforeAll(async () => {
  // to suppress errors on edge test cases that are meant to throw errors for produciton teams
  console.error = function () {}

  jest.setTimeout(30000)
  thePassword = '8308651804facb7b9af8ffc53a33a22d6a1c8ac2'
  userdata = {
    username: 'Mitul2',
    fullname: 'Jon Snow',
    email: 'Jon.Snow@gmail.com',
    password: thePassword
  }
  let newUserInfo = new User(userdata)
  // save userAuth and UserInfo to DB
  await newUserInfo.save()

  userdata = {
    username: 'aryastark',
    fullname: 'Jon Snow',
    email: 'Jon.Snow@gmail.com',
    password: thePassword
  }
  newUserInfo = new User(userdata)
  // save userAuth and UserInfo to DB
  await newUserInfo.save()

  userdata = {
    username: 'Cheng',
    fullname: 'C L',
    email: 'test@test.com',
    password: thePassword
  }
  newUserInfo = new User(userdata)
  // save userAuth and UserInfo to DB
  await newUserInfo.save()

  userdata = {
    username: 'jonsnow2',
    fullname: 'Jon Snow',
    email: 'Jon.Snow@stark.com',
    password: thePassword
  }
  newUserInfo = new User(userdata)
  // save userAuth and UserInfo to DB
  await newUserInfo.save()

  userdata = {
    username: 'Mitul',
    fullname: 'Jon Snow',
    email: 'Jon.Sno@w@gmail.com',
    password: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
  }
  newUserInfo = new User(userdata)
  // save userAuth and UserInfo to DB
  await newUserInfo.save()

  userdata = {
    username: 'sansastark',
    fullname: 'Jon Snow',
    email: 'Jon.Snow@stark.com',
    password: '2a285235a5a1678db258fe3a9540b64a04786808'
  }
  newUserInfo = new User(userdata)
  // save userAuth and UserInfo to DB
  await newUserInfo.save()
})

it('Get Current User Route - User Not On Any route', async done => {
  jest.setTimeout(30000)

  payload1 = {
    username: 'aryastark',
    password: 'Test123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const expectedResponse3 = {
    status: '200',
    success: 'false',
    msg: 'User is not currently on a route'
  }
  const response4 = await request.get('/api/user/aryastark/currentroute').set('x-auth-username', 'aryastark').set('x-auth-token', token)

  expect(response4.body.status).toBe(expectedResponse3.status)
  expect(response4.body.success).toBe(expectedResponse3.success)
  expect(response4.body.msg).toBe(expectedResponse3.msg)

  await Route.findOneAndDelete(
    { username: 'aryastark' },
    { sort: { _id: -1 } })

  done()
})

it('Get Current User Route - Username Mismatch', async done => {
  jest.setTimeout(30000)

  payload1 = {
    username: 'aryastark',
    password: 'Test123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const expectedResponse3 = {
    status: '400',
    success: 'false',
    msg: 'Bad Request, username in the body does not match x-auth-username'
  }
  const response4 = await request.get('/api/user/aryastarka/currentroute').set('x-auth-username', 'aryastark').set('x-auth-token', token)

  expect(response4.body.status).toBe(expectedResponse3.status)
  expect(response4.body.success).toBe(expectedResponse3.success)
  expect(response4.body.msg).toBe(expectedResponse3.msg)

  await Route.findOneAndDelete(
    { username: 'aryastark' },
    { sort: { _id: -1 } })

  done()
})

it('Get Current User Route - Successful', async done => {
  jest.setTimeout(30000)

  payload1 = {
    username: 'aryastark',
    password: 'Test123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const payload = {

    routedescription: 'test description 2',
    username: 'aryastark',
    routetype: 'bike',
    routetitle: 'test route 2',
    routetime: 'test time 2',
    routedistance: 2000,
    photos: [
      'fake photo',
      'another fake photo'
    ],
    mapdata: {
      coordinates: [
        200,
        200
      ],
      type: 'Point'
    }
  }

  const expectedResponse = {
    status: '200',
    success: 'true',
    msg: 'Route Successfully Created'
  }
  const response = await request.post('/api/routes/createroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)
  expect(response.body.msg).toBe(expectedResponse.msg)

  const route = await Route.findOne({ username: 'aryastark' })

  const payload2 = { username: 'aryastark' }

  const expectedResponse2 = {
    status: '200',
    success: 'true',
    msg: 'Route started successfully'
  }
  const response3 = await request.post('/api/routes/' + route.routeid + '/startroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload2)

  expect(response3.body.status).toBe(expectedResponse2.status)
  expect(response3.body.success).toBe(expectedResponse2.success)
  expect(response3.body.msg).toBe(expectedResponse2.msg)

  const expectedResponse3 = {
    status: '200',
    success: 'true',
    msg: 'Route found successfully'
  }
  const response4 = await request.get('/api/user/aryastark/currentroute').set('x-auth-username', 'aryastark').set('x-auth-token', token).send(payload2)

  expect(response4.body.status).toBe(expectedResponse3.status)
  expect(response4.body.success).toBe(expectedResponse3.success)
  expect(response4.body.msg).toBe(expectedResponse3.msg)

  await Route.findOneAndDelete(
    { username: 'aryastark' },
    { sort: { _id: -1 } })

  await Traffic.findOneAndDelete(
    { username: 'aryastark' },
    { sort: { _id: -1 } })

  done()
})

it('Signup Endpoint Test - Successful Signup', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'jonsnow',
    password: 'WinterIsComing123',
    email: 'Jon.Snow@stark.com',
    fullname: 'Jon Snow',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('true')
  expect(response.body.msg).toBe('Registration success! Please sign in')

  // remove the test user
  await User.findOneAndDelete(
    { username: 'jonsnow' },
    { sort: { _id: -1 } }
  )

  done()
})

it('Signup Endpoint Test - Missing Username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    password: 'WinterIsComing123',
    email: 'Jon.Snow@stark.com',
    fullname: 'Jon Snow',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')

  done()
})

it('Signup Endpoint Test - Missing Password', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'jonsnow',
    email: 'Jon.Snow@stark.com',
    fullname: 'Jon Snow',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')

  done()
})

it('Signup Endpoint Test - Missing Email', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'jonsnow',
    password: 'WinterIsComing123',
    fullname: 'Jon Snow',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')

  done()
})

it('Signup Endpoint Test - Missing Fullname', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'jonsnow',
    password: 'WinterIsComing123',
    email: 'Jon.Snow@stark.com',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')

  done()
})

it('Signup Endpoint Test - Invalid Username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Jon Snow',
    password: 'WinterIsComing123',
    email: 'Jon.Snow@stark.com',
    fullname: 'Jon Snow',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Username is invalid')

  done()
})

it('Signup Endpoint Test - User already exists', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Cheng',
    password: 'Test123',
    email: 'test@test.com',
    fullname: 'C L',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Username is already in use')

  done()
})

it('Signup Endpoint Test - Invalid Password', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'tyrionlannister',
    password: 'WinterIsComing',
    email: 'Jon.Snow@stark.com',
    fullname: 'Jon Snow',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Password is invalid')

  done()
})

it('Signup Endpoint Test - Invalid Email', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'jonsnow',
    password: 'WinterIsComing123',
    email: 'Jon.Snow@stark',
    fullname: 'Jon Snow',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  const response = await request.post('/api/user/signup').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Email is invalid')

  done()
})

it('Login Endpoint Test - Successful Login', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'aryastark',
    password: 'Test123'
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('true')
  expect(response.body.msg).toBe('Login successful')
  done()
})

it('Login Endpoint Test - Username Incorrect', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'fakename',
    password: 'test'
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Username and password do not match')
  done()
})

it('Login Endpoint Test - Password Incorrect', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Mitul2',
    password: 'Fakepass1'
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Username and password do not match')
  done()
})

it('Login Endpoint Test - No Username in Payload', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000)
  payload = {
    password: 'fakepass'
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Login Endpoint Test - No Password in Payload', async done => {
  // Sends POST Request to /login endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'fakename'
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Reset Password Request Endpoint Test - Email Sent Succesfully', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Mitul2'
  }
  const response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('true')
  expect(response.body.msg).toBe('Verification email sent successfully')
  done()
})

it('Reset Password Request Endpoint Test - No Username in Payload', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {}
  const response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Reset Password Request Endpoint Test - Unregistered Username in Payload', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'fakename'
  }
  const response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('User does not exist')
  done()
})

it('Reset Password Endpoint Test - Bad Email Address of user', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Mitul'
  }
  const response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Error sending email, user might have an invalid email on file')
  done()
})

it('Change Password Endpoint Test - No Username', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    newpassword: 'test',
    verificationcode: '355455'
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Change Password Endpoint Test - No New Password', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Mitul',
    verificationcode: '355455'
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Change Password Endpoint Test - No Verification Code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Mitul',
    newpassword: 'test'
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Change Password Endpoint Test - No Username and New Password', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    verificationcode: '355455'
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Change Password Endpoint Test - No Username and Verification Code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    newpassword: 'test'
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Change Password Endpoint Test - No New Password and Verification Code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Mitul'
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(400)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Bad Request')
  done()
})

it('Change Password Endpoint Test - Incorrect Verification Code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  payload = {
    username: 'Mitul2',
    newpassword: 'Test123',
    verificationcode: '355455'
  }
  const response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Verification Code is incorrect, expired or already used')
  done()
})

it('Change Password Endpoint Test - Successful Password Change', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  const username = 'aryastark'

  // send email
  payload = {
    username: username
  }
  let response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('true')
  expect(response.body.msg).toBe('Verification email sent successfully')

  // get verificaiton code
  const userVerify = await Verification.findOne({ username })
  const newpassword = 'Test123'
  // try to reset password
  payload = {
    username: username,
    newpassword: newpassword,
    verificationcode: userVerify.code
  }
  response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('true')
  expect(response.body.msg).toBe('Password Changed Successfully, please log in')
  done()
})

it('Change Password Endpoint Test - Block Re-use of verificaiton code', async done => {
  // Sends POST Request to /resetpassword endpoint
  jest.setTimeout(30000)
  const username = 'aryastark'

  // send email
  payload = {
    username: username
  }
  let response = await request.post('/api/user/resetpassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('true')
  expect(response.body.msg).toBe('Verification email sent successfully')

  // get verificaiton code
  const userVerify = await Verification.findOne({ username })
  const newpassword = 'Test123'
  // try to reset password
  payload = {
    username: username,
    newpassword: newpassword,
    verificationcode: userVerify.code
  }
  response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('true')
  expect(response.body.msg).toBe('Password Changed Successfully, please log in')

  // try to reset password
  payload = {
    username: username,
    newpassword: newpassword,
    verificationcode: userVerify.code
  }
  response = await request.post('/api/user/changepassword').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe('false')
  expect(response.body.msg).toBe('Verification Code is incorrect, expired or already used')
  done()
})

it('Get User Information - No x-auth-username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)

  const expectedResponse = { msg: 'No username, authorization denied' }
  const response = await request.get('/api/userprofile/userinformation/sansastark')

  expect(response.body.msg).toBe(expectedResponse.msg)
  done()
})

it('Get User Information - No x-auth-token', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)

  const expectedResponse = { msg: 'No token, authorization denied' }
  const response = await request.get('/api/userprofile/userinformation/sansastark').set('x-auth-username', 'sansastark')

  expect(response.body.msg).toBe(expectedResponse.msg)
  done()
})

it('Get User Information - Wrong x-auth-token', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)

  const expectedResponse = { msg: 'Token is invalid' }
  const response = await request.get('/api/userprofile/userinformation/sansastark').set('x-auth-username', 'sansastark').set('x-auth-token', 'fake')

  expect(response.body.msg).toBe(expectedResponse.msg)
  done()
})

it('Get User Information - Wrong x-auth-username', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)

  payload1 = {
    username: 'sansastark',
    password: 'WinterIsComing123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token
  const expectedResponse = { msg: 'Token is invalid' }
  const response = await request.get('/api/userprofile/userinformation/sansastark').set('x-auth-username', 'FAKEFAKE').set('x-auth-token', token)
  expect(response.body.msg).toBe(expectedResponse.msg)

  done()
})

it('Get User Information - Conflicting x-auth-username and userinformation/{username}', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)

  payload1 = {
    username: 'sansastark',
    password: 'WinterIsComing123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token
  const expectedResponse = {
    status: '400',
    success: 'false',
    msg: 'Bad Request'
  }
  const response = await request.get('/api/userprofile/userinformation/jonsnow').set('x-auth-username', 'sansastark').set('x-auth-token', token)
  expect(response.body.msg).toBe(expectedResponse.msg)
  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)

  done()
})

it('Get User Information - Successful', async done => {
  // Sends POST Request to /signup endpoint
  jest.setTimeout(30000)

  payload1 = {
    username: 'sansastark',
    password: 'WinterIsComing123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token
  const expectedResponse = {
    status: '200',
    success: 'true',
    data: {
      username: 'sansastark',
      fullname: 'Jon Snow',
      email: 'Jon.Snow@stark.com',
      totaldistancecomplete: 0,
      totalroutescomplete: 0,
      totalroutetime: '0',
      profilepic: 'FAKE BASE64 ENCODED STRING'
    },
    msg: 'User information sent'
  }
  const response = await request.get('/api/userprofile/userinformation/sansastark').set('x-auth-username', 'sansastark').set('x-auth-token', token)

  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)
  expect(response.body.data.username).toBe(expectedResponse.data.username)

  done()
})

it('Update User Information - No x-auth-username', async done => {
  jest.setTimeout(30000)
  payload = {
    username: 'Cheng',
    fullname: 'C L',
    email: 'test@test.com',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }

  const expectedResponse = { msg: 'No username, authorization denied' }

  const response = await request.post('/api/userprofile/updateuserinformation').send(payload)

  expect(response.body.msg).toBe(expectedResponse.msg)
  done()
})

it('Update User Information - No x-auth-token', async done => {
  jest.setTimeout(30000)
  payload = {
    username: 'Cheng',
    fullname: 'C L',
    email: 'test@test.com',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }

  const expectedResponse = { msg: 'No token, authorization denied' }

  const response = await request.post('/api/userprofile/updateuserinformation').send(payload).set('x-auth-username', 'Cheng')

  expect(response.body.msg).toBe(expectedResponse.msg)
  done()
})

it('Update User Information - Wrong x-auth-username', async done => {
  jest.setTimeout(30000)
  loginPaylod = {
    username: 'Cheng',
    password: 'Test123'
  }

  payload = {
    username: 'Cheng',
    fullname: 'C L',
    email: 'test@test.com',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }

  const response2 = await request.post('/api/user/login').send(loginPaylod)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token
  const expectedResponse = { msg: 'Token is invalid' }
  const response = await request.post('/api/userprofile/updateuserinformation').send(payload).set('x-auth-username', 'FAKEFAKE').set('x-auth-token', token)

  expect(response.body.msg).toBe(expectedResponse.msg)
  done()
})

it('Update User Information - Wrong x-auth-token', async done => {
  jest.setTimeout(30000)

  payload = {
    username: 'Cheng',
    fullname: 'C L',
    email: 'test@test.com',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }

  const expectedResponse = { msg: 'Token is invalid' }
  const response = await request.post('/api/userprofile/updateuserinformation').send(payload).set('x-auth-username', 'Cheng').set('x-auth-token', 'fake')

  expect(response.body.msg).toBe(expectedResponse.msg)
  done()
})

it('Update User Information - Conflicting x-auth-username and POST body.data.username', async done => {
  jest.setTimeout(30000)

  loginPaylod = {
    username: 'Mitul2',
    password: 'Test123'
  }
  payload = {
    username: 'Cheng',
    fullname: 'Mitul',
    email: 'Mitul264@gmail.com',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }

  const response2 = await request.post('/api/user/login').send(loginPaylod)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const expectedResponse = {
    status: '400',
    success: 'false',
    msg: 'Bad Request'
  }

  const response = await request.post('/api/userprofile/updateuserinformation').send(payload).set('x-auth-username', 'Mitul2').set('x-auth-token', token)

  expect(response.body.msg).toBe(expectedResponse.msg)
  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)
  done()
})

it('Update User Information - Successful', async done => {
  jest.setTimeout(30000)

  loginPaylod = {
    username: 'Cheng',
    password: 'Test123'
  }
  oldProfile = {
    username: 'Cheng',
    fullname: 'C L',
    email: 'test@test.com',
    profilepic: 'FAKE BASE64 ENCODED STRING'
  }
  payload = {
    username: 'Cheng',
    fullname: 'Chuck Lee',
    email: 'cl@test.com',
    profilepic: 'NEW FAKE PHOTO'
  }

  const response2 = await request.post('/api/user/login').send(loginPaylod)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const expectedResponse = {
    status: '200',
    success: 'true',
    msg: 'User profile updated successfully'
  }

  const response = await request.post('/api/userprofile/updateuserinformation').send(payload).set('x-auth-username', 'Cheng').set('x-auth-token', token)

  expect(response.body.msg).toBe(expectedResponse.msg)
  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)

  // change back profile
  const response3 = await request.post('/api/userprofile/updateuserinformation').send(oldProfile).set('x-auth-username', 'Cheng').set('x-auth-token', token)
  expect(response3.body.msg).toBe(expectedResponse.msg)
  expect(response3.body.status).toBe(expectedResponse.status)
  expect(response3.body.success).toBe(expectedResponse.success)
  done()
})

afterAll(async () => {
  jest.setTimeout(30000)
  let newUserInfo = await User.deleteOne({ username: 'Mitul2' })
  newUserInfo = await User.deleteOne({ username: 'Cheng' })
  newUserInfo = await User.deleteOne({ username: 'aryastark' })
  newUserInfo = await User.deleteOne({ username: 'jonsnow2' })
  newUserInfo = await User.deleteOne({ username: 'Mitul' })
  newUserInfo = await User.deleteOne({ username: 'sansastark' })

  mongoose.connection.close()
  process.env.PORT = 5000
})
