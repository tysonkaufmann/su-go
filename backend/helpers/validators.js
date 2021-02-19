
/**
 * Returns true if the username provided is valid.
 * 
 * A username is considered valid if:
 * - it has a min length of 3 and max length of 30
 * - it contains no spaces
 * - it could contain letters (both lower and upper) and numbers
 * 
 * @param {String} username The username to be validated.
 */
function validateUsername(username) {
  const regex = new RegExp(/^[a-zA-Z0-9]{3,30}$/);
  return regex.test(username);
}

/**
 * Returns true if the password provided is valid.
 * 
 * A password is considered valid if:
 * - it is between 6 to 20 characters
 * - it contains at least one numeric digit, one uppercase and one lowercase letter.
 * 
 * @param {String} password The password to be validated.
 */
function validatePassword(password) {
  const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
  return regex.test(password);
}


/**
 * Returns true if the email address provided is valid.
 * 
 * An email is considered valid if:
 * - it is in a valid email address format
 * 
 * @param {String} email The email address to be validated.
 */
function validateEmail(email) {
  // Genral email regex - RFC 5322 Official Standard
  const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regex.test(email);
}


module.exports = {
  validateUsername,
  validatePassword,
  validateEmail
};