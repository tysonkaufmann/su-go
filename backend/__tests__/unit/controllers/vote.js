// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const { vote } = require('../../../controllers/vote.js')
const mongoose = require('mongoose'); // Connects to mongodb
const { mockRequest, mockResponse } = require('mock-req-res')
const User = require('../../../models/user')
const Route = require('../../../models/route');

beforeAll(async () => {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  const connection = mongoose.connection;
  connection.once('open', () => {
      // connection successful
  })
  // to suppress errors on edge test cases that are meant to throw errors for produciton teams
  console.error = function() {}

  jest.setTimeout(30000);
  thePassword = "8308651804facb7b9af8ffc53a33a22d6a1c8ac2"
  userdata = {
    username:"Mitul2",
    fullname:"Jon Snow",
    email:"Jon.Snow@gmail.com",
    password:thePassword
  }
  var newUserInfo = new User(userdata);
  // save userAuth and UserInfo to DB
  await newUserInfo.save();

  var routeData = {
    "routeid": "1",
    "routedescription": "test description 2",
    "username": "Mitul2",
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

  var newRouteInfo = new Route(routeData);
  // save userAuth and UserInfo to DB
  await newRouteInfo.save();

});


test("Vote a Route - Route Not Found", () => {
  jest.setTimeout(30000);

  var payload = {username : "aryastark", score: 2}

  var req = mockRequest({body: payload,
    params: { routeid :"fakefakefake" },
    method: "POST",
    headers: { "x-auth-username" : "aryastark" },
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
      "status": "404",
      "success": "false",
      "msg": "Route not found"
  }

  return vote(req, res).then(data => {
    expect(data.json.status).toBe(expectedResponse.status);
    expect(data.json.success).toBe(expectedResponse.success);
    expect(data.json.msg).toBe(expectedResponse.msg);
  });
});

test("Vote a Route - Score Not Int", () => {
  jest.setTimeout(30000);

  var payload = {username : "aryastark", score: "2"}

  var req = mockRequest({body: payload,
    params: { routeid :"fakefakefake" },
    method: "POST",
    headers: { "x-auth-username" : "aryastark" },
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

  return vote(req, res).then(data => {
    expect(data.json.status).toBe(expectedResponse.status);
    expect(data.json.success).toBe(expectedResponse.success);
    expect(data.json.msg).toBe(expectedResponse.msg);
  });
});


test("Vote a Route - Score not sent", () => {
  jest.setTimeout(30000);

  var payload = {username : "aryastark"}

  var req = mockRequest({body: payload,
    params: { routeid :"fakefakefake" },
    method: "POST",
    headers: { "x-auth-username" : "aryastark" },
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

  return vote(req, res).then(data => {
    expect(data.json.status).toBe(expectedResponse.status);
    expect(data.json.success).toBe(expectedResponse.success);
    expect(data.json.msg).toBe(expectedResponse.msg);
  });
});

test("Vote a Route - Score Not in Range", () => {
  jest.setTimeout(30000);

  var payload = {username : "aryastark", score: 10}

  var req = mockRequest({body: payload,
    params: { routeid :"fakefakefake" },
    method: "POST",
    headers: { "x-auth-username" : "aryastark" },
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

  return vote(req, res).then(data => {
    expect(data.json.status).toBe(expectedResponse.status);
    expect(data.json.success).toBe(expectedResponse.success);
    expect(data.json.msg).toBe(expectedResponse.msg);
  });
});


test("Vote a Route - Score Not in Range", () => {
  jest.setTimeout(30000);

  var payload = {username : "aryastark", score: 10}

  var req = mockRequest({body: payload,
    params: { routeid :"fakefakefake" },
    method: "POST",
    headers: { "x-auth-username" : "aryastark" },
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

  return vote(req, res).then(data => {
    expect(data.json.status).toBe(expectedResponse.status);
    expect(data.json.success).toBe(expectedResponse.success);
    expect(data.json.msg).toBe(expectedResponse.msg);
  });
});


test("Vote a Route - Username Mismatch", () => {
  jest.setTimeout(30000);

  var payload = {username : "Mitul23", score: 3}

  var req = mockRequest({body: payload,
    params: { routeid :"1" },
    method: "POST",
    headers: { "x-auth-username" : "Mitul2" },
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
      "msg": "Bad Request, username in the body does not match x-auth-username"
  }

  return vote(req, res).then(data => {
    expect(data.json.status).toBe(expectedResponse.status);
    expect(data.json.success).toBe(expectedResponse.success);
    expect(data.json.msg).toBe(expectedResponse.msg);
  });
});



test("Vote a Route - Vote adding Successful", () => {
  jest.setTimeout(30000);

  var payload = {username : "Mitul2", score: 2}

  var req = mockRequest({body: payload,
    params: { routeid :"1" },
    method: "POST",
    headers: { "x-auth-username" : "Mitul2" },
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
      "msg": "Vote added successfully"
  }

  return vote(req, res).then(data => {
    expect(data.json.status).toBe(expectedResponse.status);
    expect(data.json.success).toBe(expectedResponse.success);
    expect(data.json.msg).toBe(expectedResponse.msg);
  });
});


test("Vote a Route - Vote updating Successful", () => {
  jest.setTimeout(30000);

  var payload = {username : "Mitul2", score: 3}

  var req = mockRequest({body: payload,
    params: { routeid :"1" },
    method: "POST",
    headers: { "x-auth-username" : "Mitul2" },
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
      "msg": "Vote added successfully"
  }

  return vote(req, res).then(data => {
    expect(data.json.status).toBe(expectedResponse.status);
    expect(data.json.success).toBe(expectedResponse.success);
    expect(data.json.msg).toBe(expectedResponse.msg);
  });
});


afterAll(async () => {
  jest.setTimeout(30000);
  var newUserInfo = await User.deleteOne({ username : "Mitul2"});
  routeInfo =  await Route.deleteOne({  routeid: "1"});

  mongoose.connection.close()
});
