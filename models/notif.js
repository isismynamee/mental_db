'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notif.init({
    userId: DataTypes.INTEGER,
    headMessage: DataTypes.TEXT,
    bodyMessage: DataTypes.TEXT,
    subjectMessage: DataTypes.TEXT,
    timeSend: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'notif',
  });
  return notif;
};