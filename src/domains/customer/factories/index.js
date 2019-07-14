const getCustomerModel = require('../../../models/Customer');
const CustomerService = require('../services/CustomerService');
const CustomerRepository = require('../repositories/CustomerRepository');

const getCustomerRepository = (params = {}) => {
  const model = params.model || getCustomerModel();

  return new CustomerRepository({ model });
};

const getCustomerService = (params = {}) => {
  const repository = params.repository || getCustomerRepository();

  return new CustomerService({ repository });
};

module.exports = {
  getCustomerService,
  getCustomerRepository
};
