'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.profile, {
        as:"users",
        foreignKey: {
          name: "userId"
        }
      })
      user.hasMany(models.assignment, {
        as: "usersAssignment",
        foreignKey: {
          name: "userId"
        }
      }),
      user.hasMany(models.tasklist, {
        as: "usersTasklist",
        foreignKey: {
          name: "taskId"
        }
      }),
      user.hasMany(models.schedule, {
        as: "userSchedule",
        foreignKey: {
          name: "userId"
        }
      }),
      user.hasMany(models.notif, {
        as: "notifUser",
        foreignKey: {
          name: "userId"
        }
      })
    }
  }
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};