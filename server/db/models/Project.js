const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Project = sequelize.define(
    "Project",
    {
      project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      total_amount: {
        type: DataTypes.DECIMAL(13, 2),
        allowNull: false,
        defaultValue: 0,
      },
      state: {
        type: DataTypes.ENUM("En progreso", "Finalizado"),
        allowNull: false,
        defaultValue: "En progreso",
      },
    },
    {
      tableName: "projects",
      timestamps: false,
    }
  );

  return Project;
};
