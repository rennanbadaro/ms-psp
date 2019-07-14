class TransactionRepository {
  constructor(params) {
    this.model = params.model;
  }

  create(transaction) {
    return this.model.create(transaction);
  }
}

module.exports = TransactionRepository;
