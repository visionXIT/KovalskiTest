'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  
  }, {
    sequelize,
    tableName: "History",
    modelName: 'History',
  });
  return History;
};