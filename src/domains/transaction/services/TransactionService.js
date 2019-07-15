const Joi = require('@hapi/joi');

const { getBrokenProp } = require('../../../utils/schema');
const customErrors = require('../../../utils/customErrors');

const extractCardNumberToPersist = ({ cardNumber }) =>
  cardNumber
    .split('')
    .slice(-4)
    .join('');

const transactionSchema = Joi.object().keys({
  description: Joi.string()
    .regex(/^[a-zA-Z]/)
    .required(),
  customerId: Joi.number()
    .integer()
    .required(),
  paymentMethodId: Joi.number()
    .integer()
    .required(),
  amount: Joi.number()
    .precision(2)
    .required(),
  cardNumber: Joi.string()
    .regex(/^[0-9]/)
    .required(),
  cardOwnerName: Joi.string()
    .regex(/^[a-zA-Z]/)
    .required(),
  cardExpirationDate: Joi.date()
    .min('now')
    .required(),
  cvv: Joi.string()
    .regex(/^[0-9]/)
    .required()
});

class TransactionService {
  constructor(params) {
    this.repository = params.repository;
    this.payableService = params.payableService;
  }

  getByCustomerId(id) {
    return this.repository.getByCustomerId(id);
  }

  async create(transaction) {
    const { error: schemaError } = transactionSchema.validate(transaction);

    if (schemaError) {
      throw customErrors.transaction.invalidSchema(getBrokenProp(schemaError));
    }

    try {
      const secureCardNumber = extractCardNumberToPersist(transaction);

      const createdTransaction = await this.repository
        .create({
          ...transaction,
          cardNumber: secureCardNumber
        })
        .catch(console.error);

      if (!createdTransaction.id) {
        throw customErrors.transaction.generic;
      }

      await this.payableService.create(createdTransaction);

      return createdTransaction;
    } catch (err) {
      console.error(err);
      throw customErrors.transaction.generic;
    }
  }
}

module.exports = TransactionService;
