// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const { signup, login, encrypt, resetpassword, changepassword } = require('../../../controllers/userAuth.js')
const mongoose = require('mongoose'); // Connects to mongodb
const { mockRequest, mockResponse } = require('mock-req-res')
const Verification = require('../../../models/verification')

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
        username : "Mitul2",
        password : "Fakepass1"
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
    // Successful login has been covered in integration tests

});



/* Sign Up */
describe("Sign Up", () => {

  it('Sign Up Failed - Missing Username', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      password: "WinterIsComing123", 
      email: "Jon.Snow@Targaryen.com",
      fullname: "Jon Snow",
      profilepic: "SOME BASE64 ENCODED IMAGE"
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
        "status": "400",
        "success": "false",
        "msg": "Bad Request"
    }
    var response = await signup(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);
  })


  it('Sign Up Failed - Missing Password', async() => {
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username: "JonSnow",
      email: "Jon.Snow@Targaryen.com",
      fullname: "Jon Snow",
      profilepic: "SOME BASE64 ENCODED IMAGE"
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
        "status": "400",
        "success": "false",
        "msg": "Bad Request"
    }
    var response = await signup(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);
  })


  it('Sign Up Failed - Missing Email', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username: "JonSnow",
      password: "WinterIsComing123", 
      fullname: "Jon Snow",
      profilepic: "SOME BASE64 ENCODED IMAGE"
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
        "status": "400",
        "success": "false",
        "msg": "Bad Request"
    }
    var response = await signup(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);
  })


  it('Sign Up Failed - Missing Fullname', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username: "JonSnow",
      password: "WinterIsComing123", 
      email: "Jon.Snow@Targaryen.com",
      profilepic: "SOME BASE64 ENCODED IMAGE"
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
        "status": "400",
        "success": "false",
        "msg": "Bad Request"
    }
    var response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);
  })


  it('Sign Up Failed - Invalid Username', async() => {
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username: "Jon Snow",
      password: "WinterIsComing123", 
      email: "Jon.Snow@Targaryen.com",
      fullname: "Jon Snow",
      profilepic: "SOME BASE64 ENCODED IMAGE"
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
        "msg": "Username is invalid"
    }
    var response = await signup(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);
  })


  it('Sign Up Failed - User already exists', async() => {
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username: "Cheng",
      password: "Test123", 
      email: "test@test.com",
      fullname: "C L",
      profilepic: "SOME BASE64 ENCODED IMAGE"
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
        "msg": "Username is already in use"
    }

    return signup(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status);
      expect(data.json.success).toBe(expectedResponse.success);
      expect(data.json.msg).toBe(expectedResponse.msg);
    });
  })


  it('Sign Up Failed - Invalid Password', async() => {
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username: "Cheng2",
      password: "WinterIsComing", 
      email: "Jon.Snow@Targaryen.com",
      fullname: "Jon Snow",
      profilepic: "SOME BASE64 ENCODED IMAGE"
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
        "msg": "Password is invalid"
    }

    return signup(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status);
      expect(data.json.success).toBe(expectedResponse.success);
      expect(data.json.msg).toBe(expectedResponse.msg);
    });
  })


  it('Sign Up Failed - Invalid Email', async() => {
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username: "Cheng2",
      password: "WinterIsComing123", 
      email: "Jon@Snow@stark",
      fullname: "Jon Snow",
      profilepic: "SOME BASE64 ENCODED IMAGE"
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
        "msg": "Email is invalid"
    }

    return signup(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status);
      expect(data.json.success).toBe(expectedResponse.success);
      expect(data.json.msg).toBe(expectedResponse.msg);
    });
  })

  // Successful Sign Up has been covered in integration tests

});




describe("Reset Password", () => {

  it('Email Sending Failed User Does Not Exists', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username : "fake",
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
        "msg": "User does not exist"
      }
    var response = await resetpassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);

  })

  it('Email Sending Failed Bad Email Address', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username : "Mitul",
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
        "msg": "Error sending email, user might have an invalid email on file"
    }
    var response = await resetpassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);

  })

  it('Change Password No Verification Code Provided', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username : "Mitul2",
      newpassword : "Test123",
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
        "status": "400",
        "success": "false",
        "msg": "Bad Request"
    }
    var response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);

  })

  it('Change Password No Username Provided', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      newpassword : "hello",
      verificationcode: "234343"
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
        "status": "400",
        "success": "false",
        "msg": "Bad Request"
    }
    var response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);

  })

  it('Change Password No Password Provided', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
      username : "Mitul2",
      verificationcode: "234343"
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
        "status": "400",
        "success": "false",
        "msg": "Bad Request"
    }
    var response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);

  })

  it('Change Password Incorrect Verification Code', async() => {
    // Sends email
    jest.setTimeout(30000);
    const req = mockRequest({ body: {
    	username:"Mitul2",
      verificationcode:"07571",
    	newpassword:"Test123"
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
        "msg": "Verification Code is incorrect, expired or already used"
    }
    var response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status);
    expect(response.json.success).toBe(expectedResponse.success);
    expect(response.json.msg).toBe(expectedResponse.msg);

  })

  // Successful email sending has been covered in integration tests


});

afterAll(() => {
  mongoose.connection.close()
});
