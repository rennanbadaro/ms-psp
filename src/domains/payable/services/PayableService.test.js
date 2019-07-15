const moment = require('moment');
const MockDate = require('mockdate');

const enumHelper = require('../../../utils/enum');
const { getPayableService } = require('../factories');

let repository;
let service;

describe('PayableServicce', () => {
  describe('create', () => {
    beforeAll(() => MockDate.set('2000-11-20'));
    afterAll(() => MockDate.reset());
    beforeEach(() => {
      repository = {
        create: jest.fn().mockResolvedValue({ id: 1 })
      };
      service = getPayableService({ repository });
    });
    it('Should successfuly create a new payable from a debit transaction', async () => {
      const transaction = {
        id: 2,
        description: 'Big transaction',
        customerId: 1,
        paymentMethodId: enumHelper.paymentMethod.debit,
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
        paymentMethodId: enumHelper.paymentMethod.debit,
        amount: (15000.5 * 0.97).toFixed(2),
        fee: 0.03,
        paymentDate: moment().add()
      };

      await service.create(transaction);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(expectedArgs);
    });
  });
});
