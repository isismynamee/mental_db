'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      time.belongsTo(models.tasklist, {
        as: "timeTask",
        foreignKey: {
          name: "taskId"
        }
      }),
      time.hasMany(models.schedule, {
        as: "timeSchedule",
        foreignKey: {
          name: "timeId"
        }
      })
    }
  }
  time.init({
    taskId: DataTypes.INTEGER,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'time',
  });
  return time;
};