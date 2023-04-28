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
        as: "users",
        foreignKey: {
          name: "userId"
        }
      }),
      user.hasMany(models.tasklist, {
        as: "users",
        foreignKey: {
          name: "taskId"
        }
      })
    }
  }
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};