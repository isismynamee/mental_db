'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tasklist.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "userId"
        }
      })
    }
  }
  tasklist.init({
    userId: DataTypes.INTEGER,
    taskName: DataTypes.STRING,
    description: DataTypes.STRING,
    reminder: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tasklist',
  });
  return tasklist;
};