const { payable: payableErrors } = require('../../../utils/customErrors');
const helper = require('../helper');

class PayableService {
  constructor(params) {
    this.repository = params.repository;
  }

  create(transaction) {
    const transactionValidation = helper.validateInputTransaction(transaction);

    if (transactionValidation.error) {
      throw payableErrors.invalidTransactionSchema;
    }

    const { id: transactionId, customerId } = transaction;

    const payableToCreate = {
      customerId,
      transactionId,
      statusId: helper.getPayableStatus(transaction),
      amount: helper.getPayableAmount(transaction),
      fee: helper.getPayableFee(transaction),
      paymentDate: helper.getPaymentDate(transaction)
    };

    return this.repository.create(payableToCreate);
  }

  getAllPayablesByCustomerId(id) {
    return;
  }
}

module.exports = PayableService;
