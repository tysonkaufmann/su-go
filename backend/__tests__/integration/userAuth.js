// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const User = require('../../../models/user')
const {encrypt} = require('../../../controllers/userAuth.js')
const mongoose = require('mongoose'); // Connects to mongodb

beforeAll(() => {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  const connection = mongoose.connection;
  connection.once('open', () => {
      // connection successful
  })
});

describe("Authenticate", () => {
  test('Username and Password Match', async () => {
    jest.setTimeout(30000);
    username = "Mitul"
    password = "test"
    const user = await User.findOne({ username })
    const encryptedPassword = encrypt(password)
    expect(user.authenticate(encryptedPassword)).toBe(true);
  });

});

afterAll(() => {
  mongoose.connection.close()
});
