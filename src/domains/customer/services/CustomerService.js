const customErrors = require('../../../utils/customErrors');
const { sign } = require('../../../utils/auth');

class CustomerService {
  constructor(params) {
    this.repository = params.repository;
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw customErrors.unathorized;
    }

    const { id } = (await this.repository.get({ email, password }).catch(console.error)) || {};

    if (!id) {
      throw customErrors.unathorized;
    }

    const token = sign({ id });

    return { token };
  }
}

module.exports = CustomerService;
