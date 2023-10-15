"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.Vehicle);
      Trip.belongsTo(models.Driver);
      Trip.belongsTo(models.Customer);
    }
  }
  Trip.init(
    {
      startLocation: DataTypes.STRING,
      endLocation: DataTypes.STRING,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      distanceTraveled: DataTypes.FLOAT,
      tripStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
