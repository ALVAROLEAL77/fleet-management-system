"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicle.hasMany(models.Trip);
      Vehicle.hasMany(models.MaintenanceRecord);
      Vehicle.hasMany(models.FuelingRecord);
      Vehicle.hasMany(models.Expense);
    }
  }
  Vehicle.init(
    {
      vehicleType: DataTypes.STRING,
      vehicleMake: DataTypes.STRING,
      vehicleModel: DataTypes.STRING,
      vehicleLicensePlate: DataTypes.STRING,
      currentLocation: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
