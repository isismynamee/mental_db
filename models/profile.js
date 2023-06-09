'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      profile.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "userId"
        }
      })
    }
  }
  profile.init({
    email: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};