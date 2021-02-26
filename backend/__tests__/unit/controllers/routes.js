// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const { getUserCreatedRoutes } = require('../../../controllers/routes.js')
const mongoose = require('mongoose'); // Connects to mongodb
const { mockRequest, mockResponse } = require('mock-req-res')

beforeAll(() => {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  const connection = mongoose.connection;
  connection.once('open', () => {
      // connection successful
  })
  // to suppress errors on edge test cases that are meant to throw errors for produciton teams
  console.error = function() {}
});

describe("Route", () => {
  test("Get user crated routes - Successful", () => {
    jest.setTimeout(30000);
    var req = mockRequest({params: { username: "Cheng" },
      method: "GET",
      headers: { "x-auth-username" : "Cheng" },
      header : function(header) {
        return this.headers[header]
      }
    });
    var res = mockResponse({ hostname: 'tester',
      status : function(statusCode) {
        this.status = statusCode
      },
      json : function(body) {
        this.json = body
      },
    });

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

    return getUserCreatedRoutes(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status);
      expect(data.json.success).toBe(expectedResponse.success);
      expect(data.json.data[0].username).toBe(expectedResponse.data[0].username);
      expect(data.json.data[0].routeid).toBe(expectedResponse.data[0].routeid);
      expect(data.json.data[1].username).toBe(expectedResponse.data[1].username);
      expect(data.json.data[1].routeid).toBe(expectedResponse.data[1].routeid);
    });

  });

  test("Get user crated routes - Wrong x-auth-username", () => {
    jest.setTimeout(30000);
    var req = mockRequest({params: { username: "Cheng" },
      method: "GET",
      header : function(header) {
        return this.headers[header]
      }
    });
    var res = mockResponse({ hostname: 'tester',
      status : function(statusCode) {
        this.status = statusCode
      },
      json : function(body) {
        this.json = body
      },
    });

    var expectedResponse = {
      "status": "400",
      "success": "false",
      "msg": "Bad Request"
    }

    return getUserCreatedRoutes(req, res).then(data => {
      expect(data.json.msg).toBe(expectedResponse.msg);
      expect(data.json.status).toBe(expectedResponse.status);
      expect(data.json.success).toBe(expectedResponse.success);
    });

  });

  test("Get user crated routes - User not exist", () => {
    jest.setTimeout(30000);
    var req = mockRequest({params: { username: "fakefakefake" },
      method: "GET",
      header : function(header) {
        return "fakefakefake"
      }
    });
    var res = mockResponse({ hostname: 'tester',
      status : function(statusCode) {
        this.status = statusCode
      },
      json : function(body) {
        this.json = body
      },
    });

    var expectedResponse = {
      "status": '200',
      "success": 'false',
      "msg": 'User does not exist'
    }

    return getUserCreatedRoutes(req, res).then(data => {
      expect(data.json.msg).toBe(expectedResponse.msg);
      expect(data.json.status).toBe(expectedResponse.status);
      expect(data.json.success).toBe(expectedResponse.success);
    });

  });

  
});

afterAll(() => {
  mongoose.connection.close()
});