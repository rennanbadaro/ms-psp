const Sequelize = require('sequelize');

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false
});

sequelize
  .authenticate()
  .catch(err => console.error('Could not connect to the database! \nExiting') && process.exit(1));

module.exports = sequelize;
