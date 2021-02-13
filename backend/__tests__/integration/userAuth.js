const mongoose = require('mongoose'); // Connects to mongodb
const app = require('./../../server.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

it('Login Endpoint Test - Successful Login', async done => {
  // Sends POST Request to /test endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul",
    password : "test"
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("true")
  expect(response.body.msg).toBe("Login successful")
  done()
})

it('Login Endpoint Test - Username Incorrect', async done => {
  // Sends POST Request to /test endpoint
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
  // Sends POST Request to /test endpoint
  jest.setTimeout(30000);
  payload = {
    username : "Mitul",
    password : "fakepass"
  }
  const response = await request.post('/api/user/login').send(payload)
  expect(response.status).toBe(200)
  expect(response.body.success).toBe("false")
  expect(response.body.msg).toBe("Username and password do not match")
  done()
})

afterAll(() => {
  mongoose.connection.close()
});
