class CustomerRepository {
  constructor(params) {
    this.model = params.model;
  }

  get(params = {}) {
    return this.model.findOne({ where: params });
  }
}

module.exports = CustomerRepository;
