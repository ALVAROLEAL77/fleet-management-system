"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Customer);
      Booking.belongsTo(models.Trip);
    }
  }
  Booking.init(
    {
      bookingDate: DataTypes.DATE,
      startLocation: DataTypes.STRING,
      endLocation: DataTypes.STRING,
      tripPurpose: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
