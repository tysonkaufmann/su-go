// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const mongoose = require('mongoose') // Connects to mongodb
const User = require('../../models/user')
const Route = require('../../models/route')
process.env.PORT = 10000
const supertest = require('supertest')
const app = require('./../../server.js') // Link to your server file
const request = supertest(app)

beforeAll(async () => {
  const uri = process.env.ATLAS_URI
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  const connection = mongoose.connection
  connection.once('open', () => {
    // connection successful
  })
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
  const newUserInfo = new User(userdata)
  // save userAuth and UserInfo to DB
  await newUserInfo.save()

  const routeData = {
    routeid: '1',
    routedescription: 'test description 2',
    username: 'Mitul2',
    routetitle: 'test route 2',
    routetype: 'test type 2',
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

  const newRouteInfo = new Route(routeData)
  // save userAuth and UserInfo to DB
  await newRouteInfo.save()
})

it('Vote Routes - Successful', async done => {
  jest.setTimeout(30000)

  payload1 = {
    username: 'Mitul2',
    password: 'Test123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const payload = {
    username: 'Mitul2',
    score: 3
  }

  const expectedResponse = {
    status: '200',
    success: 'true',
    msg: 'Vote added successfully'
  }
  const response = await request.post('/api/routes/1/vote').set('x-auth-username', 'Mitul2').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)
  expect(response.body.msg).toBe(expectedResponse.msg)

  done()
})

it('Vote Routes - Route Not Found', async done => {
  jest.setTimeout(30000)

  payload1 = {
    username: 'Mitul2',
    password: 'Test123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const payload = {
    username: 'Mitul2',
    score: 3
  }

  const expectedResponse = {
    status: '404',
    success: 'false',
    msg: 'Route not found'
  }
  const response = await request.post('/api/routes/fakefakefake/vote').set('x-auth-username', 'Mitul2').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)
  expect(response.body.msg).toBe(expectedResponse.msg)

  done()
})

it('Vote Routes - No Score Provided', async done => {
  jest.setTimeout(30000)

  payload1 = {
    username: 'Mitul2',
    password: 'Test123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const payload = {
    username: 'Mitul2'
  }

  const expectedResponse = {
    status: '400',
    success: 'false',
    msg: 'Bad Request'
  }
  const response = await request.post('/api/routes/fakefakefake/vote').set('x-auth-username', 'Mitul2').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)
  expect(response.body.msg).toBe(expectedResponse.msg)

  done()
})

it('Vote Routes - No Username Provided', async done => {
  jest.setTimeout(30000)

  payload1 = {
    username: 'Mitul2',
    password: 'Test123'
  }
  const response2 = await request.post('/api/user/login').send(payload1)
  expect(response2.status).toBe(200)
  expect(response2.body.success).toBe('true')
  expect(response2.body.msg).toBe('Login successful')

  const token = response2.body.token

  const payload = {
    score: 2
  }

  const expectedResponse = {
    status: '400',
    success: 'false',
    msg: 'Bad Request'
  }
  const response = await request.post('/api/routes/fakefakefake/vote').set('x-auth-username', 'Mitul2').set('x-auth-token', token).send(payload)

  expect(response.body.status).toBe(expectedResponse.status)
  expect(response.body.success).toBe(expectedResponse.success)
  expect(response.body.msg).toBe(expectedResponse.msg)

  done()
})

afterAll(async () => {
  jest.setTimeout(30000)
  const newUserInfo = await User.deleteOne({ username: 'Mitul2' })
  routeInfo = await Route.deleteOne({ routeid: '1' })

  mongoose.connection.close()
})
