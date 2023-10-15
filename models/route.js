"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Route.hasMany(models.Trip);
    }
  }
  Route.init(
    {
      startLocation: DataTypes.STRING,
      endLocation: DataTypes.STRING,
      distance: DataTypes.FLOAT,
      estimatedDuration: DataTypes.FLOAT,
      routeDescription: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Route",
    }
  );
  return Route;
};
