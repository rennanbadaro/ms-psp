const Repository = require('../repositories/PayableRepository');
const Service = require('../services/PayableService');
const getPayableModel = require('../../../models/Payable');

const getPayableRepository = (params = {}) => {
  const model = params.model || getPayableModel();

  return new Repository({ model });
};

const getPayableService = (params = {}) => {
  const repository = params.repository || getPayableRepository();

  return new Service({ repository });
};

module.exports = {
  getPayableRepository,
  getPayableService
};
