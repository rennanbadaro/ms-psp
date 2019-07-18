const Joi = require('@hapi/joi');
const moment = require('moment');

const { paymentMethods, paymentStatus } = require('../../../utils/enum');

const validateInputTransaction = ({ id: transactionId, customerId, amount, paymentMethodId }) => {
  const input = {
    transactionId,
    customerId,
    amount,
    paymentMethodId
  };

  const schema = Joi.object().keys({
    transactionId: Joi.number()
      .integer()
      .required(),
    customerId: Joi.number()
      .integer()
      .required(),
    amount: Joi.number()
      .precision(2)
      .required(),
    paymentMethodId: Joi.number()
      .integer()
      .required()
  });

  return schema.validate(input);
};

const getPayableFee = ({ paymentMethodId }) =>
  ({
    [paymentMethods.debit]: 0.03,
    [paymentMethods.credit]: 0.05
  }[paymentMethodId]);

const getPaymentDate = ({ paymentMethodId }) =>
  ({
    [paymentMethods.debit]: moment().format(),
    [paymentMethods.credit]: moment().add(30, 'days').format()
  }[paymentMethodId]);

const getPayableStatus = ({ paymentMethodId }) =>
  ({
    [paymentMethods.debit]: paymentStatus.paid,
    [paymentMethods.credit]: paymentStatus.waitingFunds
  }[paymentMethodId]);

const getPayableAmount = ({ paymentMethodId, amount }) => {
  const fee = getPayableFee({ paymentMethodId });

  return +(amount * (1 - fee)).toFixed(2);
};

const formatCustomerBalance = (totals) => {
  const baseBalance = { paid: 0, pending: 0 };

  baseBalance.paid = +totals[paymentStatus.paid].toFixed(2);
  baseBalance.pending = +totals[paymentStatus.waitingFunds].toFixed(2);

  return baseBalance;
}

module.exports = {
  validateInputTransaction,
  getPayableFee,
  getPaymentDate,
  getPayableStatus,
  getPayableAmount,
  formatCustomerBalance
};
