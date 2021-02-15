// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const UserAuth = require('../../../models/userAuth')
const {encrypt} = require('../../../controllers/userAuth.js')
const mongoose = require('mongoose'); // Connects to mongodb

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

describe("Authenticate", () => {
  test('Username and Password Match', async () => {
    jest.setTimeout(30000);
    username = "Mitul2"
    password = "test"
    const user = await UserAuth.findOne({ username })
    const encryptedPassword = encrypt(password)
    expect(user.authenticate(encryptedPassword)).toBe(true);
  });

});

afterAll(() => {
  mongoose.connection.close()
});
