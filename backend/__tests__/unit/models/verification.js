// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const Verification = require('../../../models/verification')
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

describe("Verification", () => {
  test('Verification Code Equals', async () => {
    jest.setTimeout(30000);
    username = "Mitul2"
    code = '378974'
    const newVerification = new Verification({ username, code });
    newVerification.verify(code)
    expect(newVerification.verify(code)).toBe(true);
  });

});

afterAll(() => {
  mongoose.connection.close()
});
