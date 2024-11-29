const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Split = sequelize.define(
    "Split",
    {
      split_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tickets",
          key: "ticket_id",
        },
      },
      user_amount: {
        type: DataTypes.DECIMAL(13, 2),
        allowNull: false,
      },
      user_percentage: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false,
      },
    },
    {
      tableName: "splits",
      timestamps: false,
    }
  );

  return Split;
};
