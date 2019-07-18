const Repository = require('../repositories/PayableRepository');
const Service = require('../services/PayableService');
const getPayableModel = require('../../../models/Payable');
const { getCustomerService } = require('../../customer/factories');

const getPayableRepository = (params = {}) => {
  const model = params.model || getPayableModel();

  return new Repository({ model });
};

const getPayableService = (params = {}) => {
  const repository = params.repository || getPayableRepository();
  const customerService = params.customerService || getCustomerService();

  return new Service({ repository, customerService });
};

module.exports = {
  getPayableRepository,
  getPayableService
};
