const Sequelize = require('sequelize');
const sequelize = require('../../db/sequelize');

const Payable = (connection = sequelize()) => connection.define(
  'Payable',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    customerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tb_customer',
        key: 'id'
      }
    },
    transactionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tb_transaction',
        key: 'id'
      }
    },
    statusId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tb_payable_status',
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
    fee: Sequelize.DECIMAL,
    paymentDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
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
    tableName: 'tb_transaction'
  }
);

module.exports = Payable;
