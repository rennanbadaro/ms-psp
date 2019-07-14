const Sequelize = require('sequelize');

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
const connect = () => {
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false
  });

  sequelize
    .authenticate()
    .catch(() => console.error('Could not connect to the database! \nExiting') && process.exit(1));

  return sequelize;
};

module.exports = connect;
