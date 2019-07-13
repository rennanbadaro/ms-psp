const httpStatusCodes = require('http-status-codes');

module.exports = {
  unathorized: {
    code: httpStatusCodes.UNAUTHORIZED,
    message: 'You are unathorized!'
  }
};
