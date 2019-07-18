class PayableRepository {
  constructor(params) {
    this.model = params.model;
  }

  create(payable) {
    return this.model.create(payable);
  }

  getByCustomerId(customerId) {
    return this.model.findAll({
      where: {
        customerId
      }
    });
  }
}

module.exports = PayableRepository;
