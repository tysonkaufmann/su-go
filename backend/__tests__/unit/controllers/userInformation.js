// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const { signup, login, encrypt, resetpassword, changepassword } = require('../../../controllers/userAuth.js')
const { getUserInformation } = require('../../../controllers/userInformation.js')
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



describe("UserProfile", () => {

    test("Get User Information - Successful", () => {
      jest.setTimeout(30000);
      var req = mockRequest({params: { username:"jonsnow2" },
          method: "GET",
          headers: { "x-auth-username" : "jonsnow2" },
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

      return getUserInformation(req, res).then(data => {
        expect(data.json.status).toBe(expectedResponse.status);
        expect(data.json.success).toBe(expectedResponse.success);
        expect(data.json.data.username).toBe(expectedResponse.data.username);
      });

    });

    test("Get User Information - Wrong x-auth-username", () => {
      jest.setTimeout(30000);
      var req = mockRequest({params: { username:"jonsnow2" },
          method: "GET",
          header : function(header) {
            return false
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

      return getUserInformation(req, res).then(data => {
        expect(data.json.msg).toBe(expectedResponse.msg);
        expect(data.json.status).toBe(expectedResponse.status);
        expect(data.json.success).toBe(expectedResponse.success);
      });

    });

    test("Get User Information - Wrong Username", () => {
      jest.setTimeout(30000);
      var req = mockRequest({params: { username:"fakefakefake" },
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
        "status": "200",
        "success": "false",
        "msg": "Username does not exist"
      }

      return getUserInformation(req, res).then(data => {
        expect(data.json.msg).toBe(expectedResponse.msg);
        expect(data.json.status).toBe(expectedResponse.status);
        expect(data.json.success).toBe(expectedResponse.success);
      });

    });


});

afterAll(() => {
  mongoose.connection.close()
});
