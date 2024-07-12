"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");
const {sequelize} = require("./index")


module.exports = (sequelize, DataTypes) => {
  class Task extends Model {}
  
  Task.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      timeInSeconds: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('done', 'waiting', 'process'),
        defaultValue: 'waiting',
      },
      serverId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      launchTime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      seqNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Task",
    }
  );

  return Task
}