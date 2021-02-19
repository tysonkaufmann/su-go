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

describe("User Authenticate", () => {
  test('Successfully Authenticate Username and Password', async () => {
    jest.setTimeout(30000);
    username = "Mitul2"
    password = "Test123"
    const user = await UserAuth.findOne({ username })
    const encryptedPassword = encrypt(password)
    expect(user.authenticate(encryptedPassword)).toBe(true);
  });

  test('Successfully Change Password', async () => {
    jest.setTimeout(30000);
    username = "Mitul2"
    oldpassword = "Test123"
    newpassword = "NewPassword123"
    var user = await UserAuth.findOne({ username })
    var encryptedPassword = encrypt(newpassword)
    user.changepassword(encryptedPassword)
    expect(user.authenticate(encryptedPassword)).toBe(true);

    // restore old password
    encryptedPassword = encrypt(oldpassword)
    user.changepassword(encryptedPassword)
    expect(user.authenticate(encryptedPassword)).toBe(true);
  });


});

afterAll(() => {
  mongoose.connection.close()
});
