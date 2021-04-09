const { validateUsername, validatePassword, validateEmail } = require('../../../helpers/validators')

describe('Validation Helpers', () => {
  /* Username validation tests */
  test('Valid Username', () => {
    const username = 'user'
    expect(validateUsername(username)).toBeTruthy()
  })

  test('Valid Username - Letters and Numbers', () => {
    const username = 'user123'
    expect(validateUsername(username)).toBeTruthy()
  })

  test('Invalid Username - Contains Special Chars', () => {
    const username = 'u!s@e$r*1-2_3'
    expect(validateUsername(username)).toBeFalsy()
  })

  test('Invalid Username - Contains Spaces', () => {
    const username = ' Jon Snow '
    expect(validateUsername(username)).toBeFalsy()
  })

  test('Invalid Username - Not Enough Length', () => {
    const username = 'Li'
    expect(validateUsername(username)).toBeFalsy()
  })

  test('Invalid Username - Exceeds Max Length', () => {
    const username = 'u123456789012345678901234567890'
    expect(validateUsername(username)).toBeFalsy()
  })

  /* Password validation tests */
  test('Valid Password', () => {
    const password = 'KingoftheNorth123'
    expect(validatePassword(password)).toBeTruthy()
  })

  test('Valid Password - with Special Chars', () => {
    const password = 'Pa1.!@#$%^&*()_+-=,?'
    expect(validatePassword(password)).toBeTruthy()
  })

  test('Invalid Password - No Numeric Digit', () => {
    const password = 'Password'
    expect(validatePassword(password)).toBeFalsy()
  })

  test('Invalid Password - No Uppercase Letter', () => {
    const password = 'password123'
    expect(validatePassword(password)).toBeFalsy()
  })

  test('Invalid Password - No Lowercase Letter', () => {
    const password = 'PASSWORD123'
    expect(validatePassword(password)).toBeFalsy()
  })

  test('Invalid Password - Not Enough Length', () => {
    const password = 'Go123'
    expect(validatePassword(password)).toBeFalsy()
  })

  test('Invalid Password - Exceed Max Length', () => {
    const password = 'Password1231234567890'
    expect(validatePassword(password)).toBeFalsy()
  })

  /* Email validation tests */
  test('Valid Email', () => {
    const email = 'Jon.Snow@Stark.com'
    expect(validateEmail(email)).toBeTruthy()
  })

  test('Valid Email - Domain Name with Multiple Parts', () => {
    const email = 'Jon.Snow@Stark.co.uk'
    expect(validateEmail(email)).toBeTruthy()
  })

  test('Invalid Email - Invalid Domain Name', () => {
    const email = 'Jon.Snow@Stark'
    expect(validateEmail(email)).toBeFalsy()
  })

  test('Invalid Email - No At Sign', () => {
    const email = 'WinterIsComing'
    expect(validateEmail(email)).toBeFalsy()
  })

  test('Invalid Email - Too Many At Signs', () => {
    const email = 'Winter@Is@Coming.com'
    expect(validateEmail(email)).toBeFalsy()
  })
})
