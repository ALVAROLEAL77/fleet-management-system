"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.belongsTo(models.Vehicle);
    }
  }
  Expense.init(
    {
      expenseType: DataTypes.STRING,
      expenseDate: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};
