// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const User = require('../../../models/user')
const {encrypt} = require('../../../controllers/user.js')
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

describe("User", () => {
  test('Successfully Authenticate Username and Password', async () => {
    jest.setTimeout(30000);
    username = "aryastark"
    password = "Test123"
    const user = await User.findOne({ username })
    const encryptedPassword = encrypt(password)
    expect(user.authenticate(encryptedPassword)).toBe(true);
  });

  test('Successfully Change Password', async () => {
    jest.setTimeout(30000);
    username = "Mitul2"
    oldpassword = "Test123"
    newpassword = "NewPassword123"
    var user = await User.findOne({ username })
    var encryptedPassword = encrypt(newpassword)
    user.changepassword(encryptedPassword)
    expect(user.authenticate(encryptedPassword)).toBe(true);

    // restore old password
    encryptedPassword = encrypt(oldpassword)
    user.changepassword(encryptedPassword)
    expect(user.authenticate(encryptedPassword)).toBe(true);
  });

  test('Successfully Update User Profile Information', async () => {
    jest.setTimeout(30000);
    username = "Cheng"

    var oldProfileInfo = {
      fullname: "C L",
      email: "test@test.com",
      profilepic: "FAKE BASE64 ENCODED STRING"
    }
    var newProfileInfo = {
      fullname: "Chuck Lee",
      email: "cl@test.com",
      profilepic: "NEW FAKE PHOTO"
    }

    var user = await User.findOne({ username })

    user.updateInfo(newProfileInfo)

    expect(user.fullname).toBe(newProfileInfo.fullname)
    expect(user.email).toBe(newProfileInfo.email)
    expect(user.profilepic).toBe(newProfileInfo.profilepic)

    // change back to old profile
    user.updateInfo(oldProfileInfo)

    expect(user.fullname).toBe(oldProfileInfo.fullname)
    expect(user.email).toBe(oldProfileInfo.email)
    expect(user.profilepic).toBe(oldProfileInfo.profilepic)
  })


});

afterAll(() => {
  mongoose.connection.close()
});
