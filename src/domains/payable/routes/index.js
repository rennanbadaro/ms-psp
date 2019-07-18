const { Router } = require('express');
const { getPayableService } = require('../factories');
const { getAuthenticator } = require('../../../utils/auth');
const getCustomerModel = require('../../../models/Customer');

const router = Router();
const service = getPayableService();
const auth = getAuthenticator({ model: getCustomerModel() });

router.get('/payable/balance', auth, (req, res) => {
  return service
    .getBalanceByCustomerId(req.customer)
    .then(result => res.json(result))
    .catch(err => res.send(err));
});

module.exports = router;
