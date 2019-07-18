class CustomerRepository {
  constructor(params) {
    this.model = params.model;
  }

  get(params = {}) {
    return this.model.findOne({ where: params });
  }

  getById(id) {
    return this.model.findByPk(id);
  }
}

module.exports = CustomerRepository;
