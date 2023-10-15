"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FuelingRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FuelingRecord.belongsTo(models.Vehicle);
    }
  }
  FuelingRecord.init(
    {
      fuelingDate: DataTypes.DATE,
      VehicleId: DataTypes.UUID,
      fuelingLocation: DataTypes.STRING,
      gallonsFilled: DataTypes.FLOAT,
      totalCost: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "FuelingRecord",
    }
  );
  return FuelingRecord;
};
