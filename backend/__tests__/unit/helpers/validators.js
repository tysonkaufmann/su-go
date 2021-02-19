const { validateUsername, validatePassword, validateEmail } = require('../../../helpers/validators')


describe("Validation Helpers", () => {

  /* Username validation tests */
  test('Valid Username', () => {
    var username = 'User'
    expect(validateUsername(username)).toBeTruthy();
  })

  test('Valid Username - Letters and Numbers', () => {
    var username = 'user123'
    expect(validateUsername(username)).toBeTruthy();
  })

  test('Invalid Username - Contains Special Chars', () => {
    var username = 'u!s@e$r*1-2_3'
    expect(validateUsername(username)).toBeFalsy();
  })

  test('Invalid Username - Contains Spaces', () => {
    var username = ' Jon Snow '
    expect(validateUsername(username)).toBeFalsy();
  })

  test('Invalid Username - Not Enough Length', () => {
    var username = 'Li'
    expect(validateUsername(username)).toBeFalsy();
  })

  test('Invalid Username - Exceeds Max Length', () => {
    var username = 'u123456789012345678901234567890'
    expect(validateUsername(username)).toBeFalsy();
  })



  /* Password validation tests */
  test('Valid Password', () => {
    var password = 'KingoftheNorth123'
    expect(validatePassword(password)).toBeTruthy();
  })

  test('Valid Password - with Special Chars', () => {
    var password = 'Pa1.!@#$%^&*()_+-=,?'
    expect(validatePassword(password)).toBeTruthy();
  })

  test('Invalid Password - No Numeric Digit', () => {
    var password = 'Password'
    expect(validatePassword(password)).toBeFalsy();
  })

  test('Invalid Password - No Uppercase Letter', () => {
    var password = 'password123'
    expect(validatePassword(password)).toBeFalsy();
  })

  test('Invalid Password - No Lowercase Letter', () => {
    var password = 'PASSWORD123'
    expect(validatePassword(password)).toBeFalsy();
  })

  test('Invalid Password - Not Enough Length', () => {
    var password = 'Go123'
    expect(validatePassword(password)).toBeFalsy();
  })

  test('Invalid Password - Exceed Max Length', () => {
    var password = 'Password1231234567890'
    expect(validatePassword(password)).toBeFalsy();
  })



  /* Email validation tests */
  test('Valid Email', () => {
    var email = 'Jon.Snow@Stark.com'
    expect(validateEmail(email)).toBeTruthy();
  })

  test('Valid Email - Domain Name with Multiple Parts', () => {
    var email = 'Jon.Snow@Stark.co.uk'
    expect(validateEmail(email)).toBeTruthy();
  })

  test('Invalid Email - No At Sign', () => {
    var email = 'WinterIsComing'
    expect(validateEmail(email)).toBeFalsy();
  })

  test('Invalid Email - Too Many At Signs', () => {
    var email = 'Winter@Is@Coming.com'
    expect(validateEmail(email)).toBeFalsy();
  })


});
