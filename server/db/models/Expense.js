const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Expense = sequelize.define(
    "Expense",
    {
      expense_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(13, 2),
        allowNull: false,
        defaultValue: 0,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "projects",
          key: "project_id",
        },
      },
    },
    {
      tableName: "expenses",
      timestamps: false,
    }
  );

  return Expense;
};
