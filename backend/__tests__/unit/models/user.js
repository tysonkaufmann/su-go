// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const User = require('../../../models/user')
const { encrypt } = require('../../../controllers/user.js')
const mongoose = require('mongoose') // Connects to mongodb

beforeAll(async () => {
  jest.setTimeout(30000)
  const uri = process.env.ATLAS_URI
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  const connection = mongoose.connection
  connection.once('open', () => {
    // connection successful
  })
  // to suppress errors on edge test cases that are meant to throw errors for produciton teams
  console.error = function () {}
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
})

describe('User', () => {
  test('Successfully Authenticate Username and Password', async () => {
    jest.setTimeout(30000)
    username = 'Mitul2'
    password = 'Test123'
    const user = await User.findOne({ username })
    const encryptedPassword = encrypt(password)
    expect(user.authenticate(encryptedPassword)).toBe(true)
  })

  test('Successfully Change Password', async () => {
    jest.setTimeout(30000)
    username = 'Mitul2'
    oldpassword = 'Test123'
    newpassword = 'NewPassword123'
    const user = await User.findOne({ username })
    let encryptedPassword = encrypt(newpassword)
    user.changepassword(encryptedPassword)
    expect(user.authenticate(encryptedPassword)).toBe(true)

    // restore old password
    encryptedPassword = encrypt(oldpassword)
    user.changepassword(encryptedPassword)
    expect(user.authenticate(encryptedPassword)).toBe(true)
  })

  test('Successfully Update User Profile Information', async () => {
    jest.setTimeout(30000)
    username = 'Cheng'

    const oldProfileInfo = {
      fullname: 'C L',
      email: 'test@test.com',
      profilepic: 'FAKE BASE64 ENCODED STRING'
    }
    const newProfileInfo = {
      fullname: 'Chuck Lee',
      email: 'cl@test.com',
      profilepic: 'NEW FAKE PHOTO'
    }

    const user = await User.findOne({ username })

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
})

afterAll(async () => {
  jest.setTimeout(30000)
  let newUserInfo = await User.deleteOne({ username: 'Mitul2' })
  newUserInfo = await User.deleteOne({ username: 'Cheng' })
  newUserInfo = await User.deleteOne({ username: 'aryastark' })

  mongoose.connection.close()
})
