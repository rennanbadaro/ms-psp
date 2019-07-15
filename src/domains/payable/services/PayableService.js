class PayableService {
  constructor(params) {
    this.repository = params.repository;
  }

  create(transaction) {
    return this.repository.create(transaction);
  }

  getAllPayablesByCustomerId(id) {
    return;
  }
}

module.exports = PayableService;
