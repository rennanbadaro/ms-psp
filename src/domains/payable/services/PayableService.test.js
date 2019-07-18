const moment = require('moment');
const MockDate = require('mockdate');

const enumHelper = require('../../../utils/enum');
const customErrors = require('../../../utils/customErrors');
const { getPayableService } = require('../factories');

let repository;
let customerService;
let service;

describe('PayableServicce', () => {
  afterAll(() => MockDate.reset());

  beforeEach(() => {
    MockDate.set('2000-11-20');
    repository = {
      create: jest.fn().mockResolvedValue({ id: 1 }),
      getByCustomerId: jest.fn()
    };
    customerService = {
      getById: jest.fn().mockResolvedValue({ id: 1 })
    };
    service = getPayableService({ repository, customerService });
  });

  it('Should successfuly create a new payable from a debit transaction', async () => {
    const transaction = {
      id: 2,
      description: 'Big transaction',
      customerId: 1,
      paymentMethodId: enumHelper.paymentMethods.debit,
      amount: 15000.5,
      cardNumber: '123456789',
      cardOwnerName: 'Teste',
      cardExpirationDate: `${new Date().getFullYear() + 1}-01-02 02:00:00+00`,
      cvv: '123'
    };

    const expectedArgs = {
      customerId: transaction.customerId,
      transactionId: transaction.id,
      statusId: enumHelper.paymentStatus.paid,
      amount: +(15000.5 * 0.97).toFixed(2),
      fee: 0.03,
      paymentDate: moment().format()
    };

    await service.create(transaction);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(expectedArgs);
  });

  it('Should successfuly create a new payable from a credit transaction', async () => {
    const transaction = {
      id: 2,
      description: 'Big transaction',
      customerId: 1,
      paymentMethodId: enumHelper.paymentMethods.credit,
      amount: 15000.5,
      cardNumber: '123456789',
      cardOwnerName: 'Teste',
      cardExpirationDate: `${new Date().getFullYear() + 1}-01-02 02:00:00+00`,
      cvv: '123'
    };

    const expectedArgs = {
      customerId: transaction.customerId,
      transactionId: transaction.id,
      statusId: enumHelper.paymentStatus.waitingFunds,
      amount: +(15000.5 * 0.95).toFixed(2),
      fee: 0.05,
      paymentDate: moment()
        .add(30, 'days')
        .format()
    };

    await service.create(transaction);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(expectedArgs);
  });

  it('Should return customer balance properly', async () => {
    repository.getByCustomerId = jest
      .fn()
      .mockResolvedValue([
        { statusId: 1, amount: 1000 },
        { statusId: 1, amount: 1000 },
        { statusId: 2, amount: 20.5 },
        { statusId: 2, amount: 20.5 }
      ]);
    const expectedResult = {
      paid: 2000,
      pending: 41
    };

    const balance = await service.getBalanceByCustomerId({ id: 1 });

    expect(service.customerService.getById).toHaveBeenCalledTimes(1);
    expect(repository.getByCustomerId).toHaveBeenCalledTimes(1);
    expect(balance).toMatchObject(expectedResult);
  });

  it('Should return customer balance properly when no payables exist', async () => {
    repository.getByCustomerId = jest.fn().mockResolvedValue([]);
    const expectedResult = {
      paid: 0,
      pending: 0
    };

    const balance = await service.getBalanceByCustomerId({ id: 1 });

    expect(service.customerService.getById).toHaveBeenCalledTimes(1);
    expect(repository.getByCustomerId).toHaveBeenCalledTimes(1);
    expect(balance).toMatchObject(expectedResult);
  });

  it('Should throw if customer does not exist', async () => {
    customerService.getById = jest.fn().mockResolvedValue({});

    try {
      await service.getBalanceByCustomerId({ id: 1 });
    } catch (error) {
      expect(customerService.getById).toHaveBeenCalledTimes(1);
      expect(repository.getByCustomerId).toHaveBeenCalledTimes(0);
      expect(error).toBe(customErrors.customer.customerNotFound);
    }
  });

  it('Should throw a generic error if something goes wrong during get balance', async () => {
    repository.getByCustomerId = jest.fn().mockRejectedValue('Ooops');

    try {
      await service.getBalanceByCustomerId({ id: 1 });
    } catch (error) {
      expect(customerService.getById).toHaveBeenCalledTimes(1);
      expect(error).toBe(customErrors.payable.generic);
    }
  });
});
