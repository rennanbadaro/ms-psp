const httpStatusCodes = require('http-status-codes');
const { Router } = require('express');

const { getCustomerService } = require('../factories/customerFactory');

const service = getCustomerService();
const router = Router();

router.post('/customer/login', (req, res) => {
  return service
    .login(req.body)
    .then(result => res.status(httpStatusCodes.OK).send(result))
    .catch(({ message, code }) =>
      res.status(code || httpStatusCodes.INTERNAL_SERVER_ERROR).send(message)
    );
});

module.exports = router;
