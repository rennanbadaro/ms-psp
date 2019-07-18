const customError = require('../../../utils/customErrors');
const helper = require('../helper');
const {
  paymentStatus: { paid: paidStatus, waitingFunds: waitingFundsStatus }
} = require('../../../utils/enum');

class PayableService {
  constructor(params) {
    this.repository = params.repository;
    this.customerService = params.customerService;
  }

  create(transaction) {
    const transactionValidation = helper.validateInputTransaction(transaction);

    if (transactionValidation.error) {
      throw customError.payable.invalidTransactionSchema;
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

  async getBalanceByCustomerId({ id: customerId }) {
    const customer = await this.customerService.getById(customerId);

    if (!customer.id) {
      throw customError.customer.customerNotFound;
    }

    try {
      const payables = await this.repository.getByCustomerId(customerId);

      const balanceByStatusId = payables.reduce(
        (acc, curr) => {
          acc[curr.statusId] += +curr.amount;

          return acc;
        },
        { [paidStatus]: 0, [waitingFundsStatus]: 0 }
      );
      const totalBalance = helper.formatCustomerBalance(balanceByStatusId);

      return totalBalance;
    } catch (err) {
      console.error(err);

      throw customError.payable.generic;
    }
  }
}

module.exports = PayableService;
