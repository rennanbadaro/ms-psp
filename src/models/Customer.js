const Sequelize = require('sequelize');
const sequelize = require('../../db/sequelize');

module.exports = sequelize.define(
  'Customer',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: Sequelize.STRING,
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: 'tb_customer'
  }
);
