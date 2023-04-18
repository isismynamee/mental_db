'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      event.hasMany(models.group, {
        as: "group",
        foreignKey: {
          name: "groupId"
        }
      })
    }
  }
  event.init({
    eventName: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    eventDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};