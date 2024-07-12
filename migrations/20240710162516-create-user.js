const {Sequelize} = require('sequelize');

module.exports = {
  async up({context: queryInterface}) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    });
  },
  async down({context: queryInterface}) {
    await queryInterface.dropTable("Users");
  },
};


