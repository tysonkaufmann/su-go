// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const { getUserCreatedRoutes, getAllRoutes, getRoute, createRoute, deleteRoute, startRoute, endRoute, routeTraffic } = require('../../../controllers/routes.js')
const mongoose = require('mongoose') // Connects to mongodb
const { mockRequest, mockResponse } = require('mock-req-res')
const User = require('../../../models/user')
const Route = require('../../../models/route')

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

  let routeData = {
    routeid: '1',
    routedescription: 'test description 2',
    username: 'Cheng',
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

  let newRouteInfo = new Route(routeData)
  // save userAuth and UserInfo to DB
  await newRouteInfo.save()

  routeData = {
    routeid: '0',
    routedescription: 'test description 2',
    username: 'Cheng',
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

  newRouteInfo = new Route(routeData)
  // save userAuth and UserInfo to DB
  await newRouteInfo.save()
})

describe('Route', () => {
  test('Routes - Get all Routes', () => {
    jest.setTimeout(30000)

    const req = mockRequest({
      method: 'GET',
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '200',
      success: 'true',
      msg: 'routes retrieved'
    }

    return getAllRoutes(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('View Traffic - Route Not Found', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastark' }

    const req = mockRequest({
      body: payload,
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '404',
      success: 'false',
      msg: 'Route not found'
    }

    return routeTraffic(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  // successful start a route will be covered in integration tests

  test('Start a Route - Route Not Found', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastark' }

    const req = mockRequest({
      body: payload,
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '404',
      success: 'false',
      msg: 'Route not found'
    }

    return startRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('End a Route - Route Not Found', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastark' }

    const req = mockRequest({
      body: payload,
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '404',
      success: 'false',
      msg: 'Route not found'
    }

    return endRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Delete a Route - Route Not Found', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastark' }

    const req = mockRequest({
      body: payload,
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '404',
      success: 'false',
      msg: 'Route not found'
    }

    return deleteRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Delete a Route - No Username', () => {
    jest.setTimeout(30000)

    const req = mockRequest({
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return deleteRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Start a Route - No Username', () => {
    jest.setTimeout(30000)

    const req = mockRequest({
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return startRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('End a Route - No Username', () => {
    jest.setTimeout(30000)

    const req = mockRequest({
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return endRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Delete a Route - No RouteId', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastark' }

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return deleteRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Start a Route - No RouteId', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastark' }

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return startRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('End a Route - No RouteId', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastark' }

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return endRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Start a Route - Username Mismatch', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastarka' }

    const req = mockRequest({
      body: payload,
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request, username in the body does not match x-auth-username'
    }

    return startRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Delete a Route - Username Mismatch', () => {
    jest.setTimeout(30000)

    const payload = { username: 'aryastarka' }

    const req = mockRequest({
      body: payload,
      params: { routeid: 'fakefakefake' },
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request, username in the body does not match x-auth-username'
    }

    return deleteRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  // successful deletion will be covered in integration tests
  // create a route successfully will be tested in integration tests

  test('Create a Route - No Map Data', () => {
    jest.setTimeout(30000)

    const payload = {

      routedescription: 'test description 2',
      username: 'aryastark',
      routetitle: 'test route 2',
      routetype: 'test type 2',
      routetime: 'test time 2',
      routedistance: 2000,
      photos: [
        'fake photo',
        'another fake photo'
      ]
    }

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return createRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Create a Route - No Photos', () => {
    jest.setTimeout(30000)

    const payload = {

      routedescription: 'test description 2',
      username: 'aryastark',
      routetitle: 'test route 2',
      routetype: 'test type 2',
      routetime: 'test time 2',
      routedistance: 2000,
      mapdata: {
        coordinates: [
          200,
          200
        ],
        type: 'Point'
      }
    }

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return createRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Create a Route - No Route Distance', () => {
    jest.setTimeout(30000)

    const payload = {

      routedescription: 'test description 2',
      username: 'aryastark',
      routetitle: 'test route 2',
      routetype: 'test type 2',
      routetime: 'test time 2',
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

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return createRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Create a Route - No Route Time', () => {
    jest.setTimeout(30000)

    const payload = {

      routedescription: 'test description 2',
      username: 'aryastark',
      routetitle: 'test route 2',
      routetype: 'test type 2',
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

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return createRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Create a Route - No Route Type', () => {
    jest.setTimeout(30000)

    const payload = {

      routedescription: 'test description 2',
      username: 'aryastark',
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

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return createRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Create a Route - No Route Title', () => {
    jest.setTimeout(30000)

    const payload = {

      routedescription: 'test description 2',
      username: 'aryastark',
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

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return createRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Create a Route - No Route Description', () => {
    jest.setTimeout(30000)

    const payload = {

      username: 'aryastark',
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

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return createRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Create a Route - No Username', () => {
    jest.setTimeout(30000)

    const payload = {

      routedescription: 'test description 2',
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

    const req = mockRequest({
      body: payload,
      method: 'POST',
      headers: { 'x-auth-username': 'aryastark' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return createRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Get user crated routes - Successful', () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      params: { username: 'Cheng' },
      method: 'GET',
      headers: { 'x-auth-username': 'Cheng' },
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '200',
      success: 'true',
      data: [
        {
          routeid: '1',
          routedescription: 'test description 1',
          username: 'Cheng',
          routetitle: 'test route 1',
          routetype: 'test type 1',
          routetime: 'test time 1',
          routedistance: 1000,
          photos: [
            'fake photo',
            'another fake photo'
          ],
          mapdata: {
            coordinates: [
              100,
              100
            ],
            type: 'Point'
          }
        },
        {
          routeid: '0',
          routedescription: 'test description 2',
          username: 'Cheng',
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
      ],
      msg: 'user routes retrieved'
    }

    return getUserCreatedRoutes(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.data[0].username).toBe(expectedResponse.data[0].username)
      expect(data.json.data[0].routeid).toBe(expectedResponse.data[0].routeid)
      expect(data.json.data[1].username).toBe(expectedResponse.data[1].username)
      expect(data.json.data[1].routeid).toBe(expectedResponse.data[1].routeid)
    })
  })

  test('Get user crated routes - Wrong x-auth-username', () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      params: { username: 'Cheng' },
      method: 'GET',
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '400',
      success: 'false',
      msg: 'Bad Request'
    }

    return getUserCreatedRoutes(req, res).then(data => {
      expect(data.json.msg).toBe(expectedResponse.msg)
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
    })
  })

  test('Get user crated routes - User not exist', () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      params: { username: 'fakefakefake' },
      method: 'GET',
      header: function (header) {
        return 'fakefakefake'
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '200',
      success: 'false',
      msg: 'User does not exist'
    }

    return getUserCreatedRoutes(req, res).then(data => {
      expect(data.json.msg).toBe(expectedResponse.msg)
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
    })
  })

  test('Get a route - Successful', () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      params: { routeid: '1' },
      method: 'GET',
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '200',
      success: 'true',
      data: [
        {
          routeid: '0',
          routedescription: 'test description 1',
          username: 'Cheng',
          routetitle: 'test route 1',
          routetype: 'test type 1',
          routetime: 'test time 1',
          routedistance: 1000,
          photos: [
            'fake photo',
            'another fake photo'
          ],
          mapdata: {
            coordinates: [
              100,
              100
            ],
            type: 'Point'
          }
        },
        {
          routeid: '1',
          routedescription: 'test description 2',
          username: 'Cheng',
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
      ],
      msg: 'Route does not exist'
    }

    return getRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
    })
  })

  test('Get a route - Route Does not exist', () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      params: { routeid: 'fakefakefake' },
      method: 'GET',
      header: function (header) {
        return this.headers[header]
      }
    })
    const res = mockResponse({
      hostname: 'tester',
      status: function (statusCode) {
        this.status = statusCode
      },
      json: function (body) {
        this.json = body
      }
    })

    const expectedResponse = {
      status: '404',
      success: 'false',
      msg: 'Route does not exist'
    }

    return getRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
    })
  })
})

afterAll(async () => {
  jest.setTimeout(30000)
  let newUserInfo = await User.deleteOne({ username: 'Mitul2' })
  newUserInfo = await User.deleteOne({ username: 'Cheng' })
  newUserInfo = await User.deleteOne({ username: 'aryastark' })
  routeInfo = await Route.deleteOne({ routeid: '1' })
  routeInfo = await Route.deleteOne({ routeid: '0' })

  mongoose.connection.close()
})
