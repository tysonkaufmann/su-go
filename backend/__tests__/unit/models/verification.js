// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const Verification = require('../../../models/verification')
const User = require('../../../models/user')
const mongoose = require('mongoose'); // Connects to mongodb

beforeAll(async () =>  {
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

afterAll(async () => {
  jest.setTimeout(30000);
  var newUserInfo = await User.deleteOne({ username : "Mitul2"});
  mongoose.connection.close()
});
