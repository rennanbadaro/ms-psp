const Customer = require('../../../models/Customer');
const CustomerService = require('../services/CustomerService');
const CustomerRepository = require('../repositories/CustomerRepository');

const getCustomerRepository = (params = {}) => {
  const model = params.model || Customer;

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
