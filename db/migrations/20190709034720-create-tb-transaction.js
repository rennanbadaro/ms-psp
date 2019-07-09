const tableName = 'tb_transaction';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_customer',
          key: 'id'
        }
      },
      paymentMethodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_payment_method',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      cardNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardOwnerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardExpirationDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cvv: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};
