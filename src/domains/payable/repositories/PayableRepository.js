
class PayableRepository {
  contructor(params) {
    this.model = params.model;
  }

  create(payable) {
    return this.model.create(payable);
  }
}

module.exports = PayableRepository;
