const httpStatusCodes = require('http-status-codes');

module.exports = {
  auth: {
    unathorized: {
      code: httpStatusCodes.UNAUTHORIZED,
      message: 'Invalid credentials'
    }
  },

  transaction: {
    generic: {
      code: httpStatusCodes.BAD_REQUEST,
      message: 'Error while creating the transaction'
    },

    invalidSchema(brokenProp) {
      return {
        code: httpStatusCodes.BAD_REQUEST,
        message: `Error while creating the transaction. "${brokenProp}" is invalid`
      };
    }
  }
};
