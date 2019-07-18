const httpStatusCodes = require('http-status-codes');

module.exports = {
  auth: {
    unathorized: {
      code: httpStatusCodes.UNAUTHORIZED,
      message: 'Invalid credentials'
    }
  },

  customer: {
    customerNotFound: {
      code: httpStatusCodes.BAD_REQUEST,
      message: 'Customer not found'
    }
  },

  transaction: {
    generic: {
      code: httpStatusCodes.BAD_REQUEST,
      message: 'Could not create the transaction'
    },

    invalidSchema(brokenProp) {
      return {
        code: httpStatusCodes.BAD_REQUEST,
        message: `Error while creating the transaction. "${brokenProp}" is invalid`
      };
    }
  },

  payable: {
    generic: {
      code: httpStatusCodes.BAD_REQUEST,
      message: 'Could not get your balance'
    },

    invalidTransactionSchema: {
      code: httpStatusCodes.BAD_REQUEST,
      message: 'Transaction provided is invalid'
    }
  }
};
