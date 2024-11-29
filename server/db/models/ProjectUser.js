const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProjectUser = sequelize.define(
    "ProjectUser",
    {
      project_users_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
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
      tableName: "projects_users",
      timestamps: false,
    }
  );

  return ProjectUser;
};
