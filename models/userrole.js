"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.belongsToMany(models.User, { through: "UserUserRoles" });
      UserRole.belongsToMany(models.Permission, {
        through: "UserRolePermissions",
      });
    }
  }
  UserRole.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserRole",
    }
  );
  return UserRole;
};
