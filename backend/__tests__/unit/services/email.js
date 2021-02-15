// Boilerplate https://bcostabatista.medium.com/testing-nodejs-applications-with-jest-7ae334daaf55
const {Email} = require('../../../services/email')

describe("EmailService", () => {

  it('Email Sending Successful - Correct Email', async done => {
    // Sends email
    jest.setTimeout(30000);
    var emailService = new Email();
    const response = await emailService.send("mitul0011@gmail.com")
    expect(typeof response).toBe('string');
    done()
  })

});
