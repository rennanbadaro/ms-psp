const PayableRepository = require('../repositories/PayableRepository');
const PayableService = require('../services/PayableService');
const getPayableModel = require('../../../models/Payable');

const getPayableRepository = (params = {}) => {
  const model = params.model || getPayableModel();

  return new PayableRepository({ model });
};

const getPayableService = (params = {}) => {
  const repository = params.repository || getPayableRepository();

  return new PayableService({ repository });
};

module.exports = {
  getPayableRepository,
  getPayableService
};
