const jwtDefault = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes');

const { JWT_SECRET } = process.env;

const sign = ({ id, jwt = jwtDefault }) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '24h' });

const getAuthenticator = ({ jwt = jwtDefault, model }) => async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(UNAUTHORIZED).end();
  }

  const bearer = req.headers.authorization;
  const token = bearer && bearer.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const customer = await model.findByPk(decoded.id);

    if (!customer.id) {
      return res.status(UNAUTHORIZED).end();
    }

    req.customer = customer;
  } catch (err) {
    console.error(err);

    return res.status(UNAUTHORIZED).end();
  }

  return next();
};

module.exports = { sign, getAuthenticator };
