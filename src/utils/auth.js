const jwtDefault = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes');

const { JWT_SECRET } = process.env;

const sign = ({ id, jwt = jwtDefault }) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '24h' });

const getAuthenticator = (jwt = jwtDefault, Model) => async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(UNAUTHORIZED).end();
  }

  const bearer = req.headers.authorization;

  try {
    const decoded = jwt.verify(bearer, JWT_SECRET);
    const customer = await Model.findByPk(decoded.id);

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
