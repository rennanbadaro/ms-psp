const Sequelize = require('sequelize');
const sequelize = require('../../db/sequelize');

module.exports = sequelize.define(
  'PaymentMethod',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    description: Sequelize.STRING,
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: true,
    tableName: 'tb_payment_method'
  }
);
