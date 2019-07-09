const Sequelize = require('sequelize');
const sequelize = require('../../db/sequelize');

const Transaction = sequelize.define(
  'Transaction',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    description: Sequelize.STRING,
    customerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tb_customer',
        key: 'id'
      }
    },
    paymentMethodId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tb_payment_method',
        key: 'id'
      }
    },
    amount: Sequelize.DECIMAL,
    cardNumber: Sequelize.STRING,
    cardOwnerName: Sequelize.STRING,
    cardExpirationDate: Sequelize.DATE,
    cvv: Sequelize.STRING,
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
    tableName: 'tb_transaction'
  }
);

module.exports = Transaction;
