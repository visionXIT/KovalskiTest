const {Sequelize} = require('sequelize');

module.exports = {
  async up({context: queryInterface}) {
    await queryInterface.createTable("Tasks", {
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
      timeInSeconds: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('done', 'waiting', 'process'),
        defaultValue: 'waiting',
      },
      serverId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      launchTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      seqNum: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  async down({context: queryInterface}) {
    await queryInterface.dropTable("Tasks");
  },
};


