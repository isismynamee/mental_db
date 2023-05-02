'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      assignment.belongsTo(models.user, {
        as: "usersAssignment",
        foreignKey: {
          name: "userId"
        }
      }),
      assignment.belongsTo(models.tasklist, {
        as: "tasklists",
        foreignKey: {
          name: "taskId"
        }
      })
    }
  }
  assignment.init({
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'important'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'not yet implemented'
    }
  }, {
    sequelize,
    modelName: 'assignment',
  });
  return assignment;
};