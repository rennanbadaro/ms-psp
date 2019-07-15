const customErrors = require('../../../utils/customErrors');
const { getTransactionService } = require('../factories/transactionFactory');

let repository;
let service;
let payableService;

describe('Transaction Service', () => {
  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue({ id: 1 })
    };
    payableService = {
      create: jest.fn().mockResolvedValue({ id: 1 })
    };
    service = getTransactionService({ repository, payableService });
  });

  it('Should succesfully create a new transaction', async () => {
    const payload = {
      description: 'Big transaction',
      customerId: 1,
      paymentMethodId: 2,
      amount: 15000.5,
      cardNumber: '123456789',
      cardOwnerName: 'Teste',
      cardExpirationDate: `${new Date().getFullYear() + 1}-01-02 02:00:00+00`,
      cvv: '123'
    };

    const expectedArgs = {
      ...payload,
      cardNumber: '6789'
    };

    await service.create(payload);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(expectedArgs);
    expect(payableService.create).toHaveBeenCalledTimes(1);
  });

  it('Should throw if the transaction does not meet the schema', async () => {
    const payload = {
      description: 'Big transaction',
      paymentMethodId: 2,
      customerId: 1,
      amount: 15000.5,
      cardNumber: '123456789',
      cardOwnerName: 'Teste',
      cardExpirationDate: `${new Date().getFullYear() - 1}-01-02 02:00:00+00`,
      cvv: '123'
    };
    const expectedError = customErrors.transaction.invalidSchema('cardExpirationDate');

    return service
      .create(payload)
      .then(() => Promise.reject('This is not right...'))
      .catch(err => {
        expect(err).toEqual(expectedError);
      });
  });
});
