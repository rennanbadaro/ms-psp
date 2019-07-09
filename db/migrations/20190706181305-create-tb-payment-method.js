const tableName = 'tb_payment_method';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      tableName,
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
          allowNull: false
        },
        description: {
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
      },
    );
  },

  down: (queryInterface, _) => {
    return queryInterface.dropTable(tableName);
  }
};
