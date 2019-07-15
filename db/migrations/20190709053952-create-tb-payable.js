const tableName = 'tb_payable';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
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
      amount: Sequelize.DECIMAL,
      fee: Sequelize.DECIMAL,
      paymentDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};
