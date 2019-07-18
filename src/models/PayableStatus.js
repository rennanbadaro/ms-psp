const Sequelize = require('sequelize');
const sequelize = require('../../db/sequelize');

module.exports = sequelize.define(
  'PayableStatus',
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'tb_payable_status'
  }
);
