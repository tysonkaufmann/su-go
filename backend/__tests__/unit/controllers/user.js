// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const {
  signup,
  login,
  encrypt,
  resetpassword,
  changepassword,
  getUserInformation,
  updateUserInformation,
  getUserCurrentRoute
} = require('../../../controllers/user.js')
const User = require('../../../models/user')
const mongoose = require('mongoose') // Connects to mongodb
const { mockRequest, mockResponse } = require('mock-req-res')
const Verification = require('../../../models/verification')

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
})

describe('User', () => {
  test('Successful Password Encryption', () => {
    const password = 'password'
    expect(encrypt(password)).toBe('5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8')
  })

  test('Current User Route - User Not on Route', () => {
    jest.setTimeout(30000)

    const req = mockRequest({
      params: { username: 'aryastark' },
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
      status: '200',
      success: 'false',
      msg: 'User is not currently on a route'
    }

    return getUserCurrentRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Current User Route - Username Mismatch', () => {
    jest.setTimeout(30000)

    const req = mockRequest({
      params: { username: 'aryastarka' },
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

    return getUserCurrentRoute(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Failed Login - Incorrect Username', () => {
    jest.setTimeout(30000)

    const req = mockRequest({
      body: {
        username: 'Fakename',
        password: 'test'
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
      msg: 'Username and password do not match'
    }

    return login(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  test('Failed Login - Incorrect Password', () => {
    jest.setTimeout(30000)

    const req = mockRequest({
      body: {
        username: 'Mitul2',
        password: 'Fakepass1'
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
      msg: 'Username and password do not match'
    }

    return login(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })
  // Successful login has been covered in integration tests

  test('Get User Information - Successful', () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      params: { username: 'jonsnow2' },
      method: 'GET',
      headers: { 'x-auth-username': 'jonsnow2' },
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
      data: {
        username: 'jonsnow2',
        fullname: 'Jon Snow',
        email: 'Jon.Snow@stark.com',
        totaldistancecomplete: 0,
        totalroutescomplete: 0,
        totalroutetime: '0',
        profilepic: 'FAKE BASE64 ENCODED STRING'
      },
      msg: 'User information sent'
    }

    return getUserInformation(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.data.username).toBe(expectedResponse.data.username)
    })
  })

  test('Get User Information - Wrong x-auth-username', () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      params: { username: 'jonsnow2' },
      method: 'GET',
      header: function (header) {
        return false
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

    return getUserInformation(req, res).then(data => {
      expect(data.json.msg).toBe(expectedResponse.msg)
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
    })
  })

  test('Get User Information - Wrong Username', () => {
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
      msg: 'Username does not exist'
    }

    return getUserInformation(req, res).then(data => {
      expect(data.json.msg).toBe(expectedResponse.msg)
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
    })
  })

  it('Update User Profile Failed - No Username Provided', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      headers: { 'x-auth-username': 'Cheng' },
      header: function (header) {
        return this.headers[header]
      },
      body: {
        username: 'Cheng',
        fullname: 'C L',
        email: 'test@test.com'
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

    const response = await updateUserInformation(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Update User Profile Failed - No Fullname Provided', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      headers: { 'x-auth-username': 'Cheng' },
      header: function (header) {
        return this.headers[header]
      },
      body: {
        username: 'Cheng',
        email: 'test@test.com',
        profilepic: 'FAKE BASE64 ENCODED STRING'
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

    const response = await updateUserInformation(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Update User Profile Failed - No Email Provided', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      headers: { 'x-auth-username': 'Cheng' },
      header: function (header) {
        return this.headers[header]
      },
      body: {
        username: 'Cheng',
        fullname: 'C L',
        profilepic: 'FAKE BASE64 ENCODED STRING'
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

    const response = await updateUserInformation(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Update User Profile Failed - No Profile Picture Provided', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      headers: { 'x-auth-username': 'Cheng' },
      header: function (header) {
        return this.headers[header]
      },
      body: {
        username: 'Cheng',
        fullname: 'C L',
        email: 'test@test.com'
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

    const response = await updateUserInformation(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  test('Update User Profile Failed - Wrong x-auth-username', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      header: function (header) {
        return false
      },
      body: {
        username: 'Cheng',
        fullname: 'C L',
        email: 'test@test.com',
        profilepic: 'FAKE BASE64 ENCODED STRING'
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

    const response = await updateUserInformation(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  test('Update User Profile Failed - Invalid Email', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      headers: { 'x-auth-username': 'Cheng' },
      header: function (header) {
        return this.headers[header]
      },
      body: {
        username: 'Cheng',
        fullname: 'C L',
        email: 'testtest.com',
        profilepic: 'FAKE BASE64 ENCODED STRING'
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
      msg: 'New email is invalid'
    }

    const response = await updateUserInformation(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  test('Update User Profile Failed - User Not Found', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      header: function (header) {
        return 'fakefakefake'
      },
      body: {
        username: 'fakefakefake',
        fullname: 'C L',
        email: 'test@test.com',
        profilepic: 'FAKE BASE64 ENCODED STRING'
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

    const response = await updateUserInformation(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Sign Up Failed - Missing Username', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        password: 'WinterIsComing123',
        email: 'Jon.Snow@Targaryen.com',
        fullname: 'Jon Snow',
        profilepic: 'SOME BASE64 ENCODED IMAGE'
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
    const response = await signup(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Sign Up Failed - Missing Password', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'JonSnow',
        email: 'Jon.Snow@Targaryen.com',
        fullname: 'Jon Snow',
        profilepic: 'SOME BASE64 ENCODED IMAGE'
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
    const response = await signup(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Sign Up Failed - Missing Email', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'JonSnow',
        password: 'WinterIsComing123',
        fullname: 'Jon Snow',
        profilepic: 'SOME BASE64 ENCODED IMAGE'
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
    const response = await signup(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Sign Up Failed - Missing Fullname', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'JonSnow',
        password: 'WinterIsComing123',
        email: 'Jon.Snow@Targaryen.com',
        profilepic: 'SOME BASE64 ENCODED IMAGE'
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
    const response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Sign Up Failed - Invalid Username', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'Jon Snow',
        password: 'WinterIsComing123',
        email: 'Jon.Snow@Targaryen.com',
        fullname: 'Jon Snow',
        profilepic: 'SOME BASE64 ENCODED IMAGE'
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
      msg: 'Username is invalid'
    }
    const response = await signup(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Sign Up Failed - User already exists', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'Cheng',
        password: 'Test123',
        email: 'test@test.com',
        fullname: 'C L',
        profilepic: 'SOME BASE64 ENCODED IMAGE'
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
      msg: 'Username is already in use'
    }

    return signup(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  it('Sign Up Failed - Invalid Password', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'Cheng2',
        password: 'WinterIsComing',
        email: 'Jon.Snow@Targaryen.com',
        fullname: 'Jon Snow',
        profilepic: 'SOME BASE64 ENCODED IMAGE'
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
      msg: 'Password is invalid'
    }

    return signup(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  it('Sign Up Failed - Invalid Email', async () => {
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'Cheng2',
        password: 'WinterIsComing123',
        email: 'Jon@Snow@stark',
        fullname: 'Jon Snow',
        profilepic: 'SOME BASE64 ENCODED IMAGE'
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
      msg: 'Email is invalid'
    }

    return signup(req, res).then(data => {
      expect(data.json.status).toBe(expectedResponse.status)
      expect(data.json.success).toBe(expectedResponse.success)
      expect(data.json.msg).toBe(expectedResponse.msg)
    })
  })

  // Successful Sign Up has been covered in integration tests

  it('Email Sending Failed User Does Not Exists', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'fake'
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
    const response = await resetpassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Email Sending Failed Bad Email Address', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'Mitul'
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
      msg: 'Error sending email, user might have an invalid email on file'
    }
    const response = await resetpassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Change Password No Verification Code Provided', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'Mitul2',
        newpassword: 'Test123'
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
    const response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Change Password No Username Provided', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        newpassword: 'hello',
        verificationcode: '234343'
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
    const response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Change Password No Password Provided', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'Mitul2',
        verificationcode: '234343'
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
    const response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  it('Change Password Incorrect Verification Code', async () => {
    // Sends email
    jest.setTimeout(30000)
    const req = mockRequest({
      body: {
        username: 'Mitul2',
        verificationcode: '07571',
        newpassword: 'Test123'
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
      msg: 'Verification Code is incorrect, expired or already used'
    }
    const response = await changepassword(req, res)
    expect(response.json.status).toBe(expectedResponse.status)
    expect(response.json.success).toBe(expectedResponse.success)
    expect(response.json.msg).toBe(expectedResponse.msg)
  })

  // Successful email sending has been covered in integration tests
})

afterAll(async () => {
  jest.setTimeout(30000)
  let newUserInfo = await User.deleteOne({ username: 'Mitul2' })
  newUserInfo = await User.deleteOne({ username: 'Cheng' })
  newUserInfo = await User.deleteOne({ username: 'aryastark' })
  newUserInfo = await User.deleteOne({ username: 'jonsnow2' })
  newUserInfo = await User.deleteOne({ username: 'Mitul' })

  mongoose.connection.close()
})
