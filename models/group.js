'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      group.belongsTo(models.event, {
        as: "event",
        foreignKey: {
          name: "groupId"
        }
      }),
      group.belongsToMany(models.user, {
        as: "users",
        through: {
          model: "memberEvent",
          as: "bridge"
        }
      })
    }
  }
  group.init({
    groupName: DataTypes.STRING,
    description: DataTypes.STRING,
    eventsGroup: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};