const { readdirSync } = require('fs');
const { join } = require('path');

const loadRoutes = app => {
  const domains = readdirSync(join(__dirname)).filter(item => !/.*\.js$/.test(item));

  const domainHasRoutes = domain =>
    !!readdirSync(join(__dirname, domain)).find(item => item === 'routes');

  domains.forEach(domain => {
    if (domainHasRoutes(domain)) {
      app.use(require(join(__dirname, domain, 'routes')));
    }
  });
};

module.exports = loadRoutes;
