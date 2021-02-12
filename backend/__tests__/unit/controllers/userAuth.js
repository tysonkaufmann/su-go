// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const {login, encrypt} = require('../../../controllers/userAuth.js')
const mongoose = require('mongoose'); // Connects to mongodb
const { mockRequest, mockResponse } = require('mock-req-res')

beforeAll(() => {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  const connection = mongoose.connection;
  connection.once('open', () => {
      // connection successful
  })
});

describe("Login", () => {
    test("Successful Password Encryption", () => {
        var password = "password"
        expect(encrypt(password)).toBe("5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8");
    });


    test("Failed Login - Incorrect Username", () => {
      jest.setTimeout(30000);

      const req = mockRequest({ body: {
        username : "Fakename",
        password : "test"
      } });
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
        "msg": "Username and password do not match"
      }

      return login(req, res).then(data => {
        expect(data.json.status).toBe(expectedResponse.status);
        expect(data.json.success).toBe(expectedResponse.success);
        expect(data.json.msg).toBe(expectedResponse.msg);
      });

    });

    test("Failed Login - Incorrect Password", () => {
      jest.setTimeout(30000);

      const req = mockRequest({ body: {
        username : "Mitul",
        password : "fakepass"
      } });
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
        "msg": "Username and password do not match"
      }

      return login(req, res).then(data => {
        expect(data.json.status).toBe(expectedResponse.status);
        expect(data.json.success).toBe(expectedResponse.success);
        expect(data.json.msg).toBe(expectedResponse.msg);
      });

    });

    // test("Successful Login - Correct Credentials", () => {
    //   jest.setTimeout(30000);
    //
    //   const req = mockRequest({ body: {
    //     username : "Mitul",
    //     password : "test"
    //   } });
    //   var res = mockResponse({ hostname: 'tester',
    //     status : function(statusCode) {
    //       this.status = statusCode
    //     },
    //     json : function(body) {
    //       this.json = body
    //     },
    //   });
    //
    //   var expectedResponse = {
    //     "status": "200",
    //     "success": "true",
    //     "msg": "Login successful"
    //   }
    //
    //   return login(req, res).then(data => {
    //     expect(data.json.status).toBe(expectedResponse.status);
    //     expect(data.json.success).toBe(expectedResponse.success);
    //     expect(data.json.msg).toBe(expectedResponse.msg);
    //   });
    //
    // });

});

afterAll(() => {
  mongoose.connection.close()
});
