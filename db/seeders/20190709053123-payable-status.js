const tableName = 'tb_payable_status';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      tableName,
      [
        {
          description: 'Paid'
        },
        {
          description: 'Waiting Funds'
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
