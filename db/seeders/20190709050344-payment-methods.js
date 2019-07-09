const tableName = 'tb_payment_method';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      tableName,
      [
        {
          description: 'Debit'
        },
        {
          description: 'Credit'
        }
      ],
      {
        timestamps: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};
