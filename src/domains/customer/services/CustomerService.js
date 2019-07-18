const customErrors = require('../../../utils/customErrors');
const { sign } = require('../../../utils/auth');

class CustomerService {
  constructor(params) {
    this.repository = params.repository;
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw customErrors.auth.unathorized;
    }

    const { id } = (await this.repository.get({ email, password }).catch(console.error)) || {};

    if (!id) {
      throw customErrors.auth.unathorized;
    }

    const token = sign({ id });

    return { token };
  }

  getById(customerId) {
    return this.repository.getById(customerId);
  }
}

module.exports = CustomerService;
