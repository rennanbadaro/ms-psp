const getTransactionModel = require('../../../models/Transaction');
const Repository = require('../repositories/TransactionRepository');
const Service = require('../services/TransactionService');
const { getPayableService } = require('../../payable/factories');

const getTransactionRepository = (params = {}) => {
  const model = params.model || getTransactionModel();

  return new Repository({ model });
};

const getTransactionService = (params = {}) => {
  const repository = params.repository || getTransactionRepository();
  const payableService = params.payableService || getPayableService();

  return new Service({ repository, payableService });
};

module.exports = {
  getTransactionRepository,
  getTransactionService
};
