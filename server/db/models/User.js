const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      initials: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      finished_onboarding: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};
