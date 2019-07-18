const httpStatus = require('http-status-codes');
const { Router } = require('express');

const getCustomerModel = require('../../../models/Customer');
const { getAuthenticator } = require('../../../utils/auth');
const { getTransactionService } = require('../factories/transactionFactory');

const router = Router();
const service = getTransactionService();
const auth = getAuthenticator({ model: getCustomerModel() });

router.post('/transaction', auth, (req, res) => {
  return service
    .create(req.body)
    .then(result => res.status(httpStatus.CREATED).send(result))
    .catch(err => res.send(err));
});

module.exports = router;
