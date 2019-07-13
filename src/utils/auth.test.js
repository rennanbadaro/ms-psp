const httpStatusCodes = require('http-status-codes');

const { getAuthenticator } = require('./auth');

const req = {
  headers: {
    authorization: 'supertoken'
  }
};

let model;
let next;
let endFnMock;

describe('Auth Middleware', () => {
  beforeEach(() => {
    model = {
      findByPk: jest.fn().mockResolvedValue({ id: 1 })
    };
    endFnMock = jest.fn();
    res = {
      status: jest.fn(() => ({ end: endFnMock }))
    };
    next = jest.fn();
  });

  it('Should call next middleware if auth is successful', async () => {
    const jwt = {
      verify: jest.fn().mockReturnValue({ id: 1 })
    };
    const auth = getAuthenticator(jwt, model);

    await auth(req, res, next);

    expect(model.findByPk).toHaveBeenCalledTimes(1);
    expect(jwt.verify).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should respond with 401 if no auth header is sent', async () => {
    const req = {};
    const next = jest.fn();

    const auth = getAuthenticator(req, res, next);
  });

  it('Should respond with 401 if bearer is invalid', async () => {
    const jwt = {
      verify: jest.fn(() => {
        throw Error('Not this time');
      })
    };
    const model = {
      findByPk: jest.fn().mockResolvedValue({ id: 1 })
    };

    const auth = getAuthenticator(jwt, model);

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(endFnMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(httpStatusCodes.UNAUTHORIZED);
    expect(model.findByPk).toHaveBeenCalledTimes(0);
  });

  it('Should respond with 401 if customer is does not exist', async () => {
    const jwt = {
      verify: jest.fn().mockReturnValue({ id: 1 })
    };
    const model ={
      findByPk: jest.fn().mockResolvedValue({})
    };

    const auth = getAuthenticator(jwt, model);

    await auth(req, res, next);

    expect(model.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(endFnMock).toHaveBeenCalledTimes(1);
  });
});
