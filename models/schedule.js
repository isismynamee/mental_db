'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      schedule.belongsTo(models.user, {
        as: "userSchedule",
        foreignKey: {
          name: "userId"
        }
      }),
      schedule.belongsTo(models.tasklist, {
        as: "taskSchedule",
        foreignKey: {
          name: "taskId"
        }
      }),
      schedule.belongsTo(models.time, {
        as: "timeSchedule",
        foreignKey: {
          name: "timeId"
        }
      })
    }
  }
  schedule.init({
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    timeId: DataTypes.INTEGER,
    assignmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'schedule',
  });
  return schedule;
};