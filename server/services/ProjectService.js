const { Project } = require("../db/config");
const { ProjectUser } = require("../db/config");
const { registerPendingUser } = require("../services/AuthService");
const {
  getUserByEmail,
  getUsersByIdList,
  getUserById,
} = require("../services/UserService");
const { Op } = require("sequelize");
const { addNotification } = require("./NotificationsService");
const { removeSplitFromUserByProjectId } = require("./SplitService");

const ADDED_PARTICIPANT_SUCCESFULLY = "Participante agregado correctamente.";

const addProject = async (projectData) => {
  try {
    const user = await getUserById(projectData.user_id);

    if (!user) {
      throw new Error("El usuario no existe.");
    }

    const newProject = await Project.create(projectData);

    await ProjectUser.create({
      user_id: projectData.user_id,
      project_id: newProject.project_id,
    });

    return newProject;
  } catch (err) {
    console.error("Error creando proyecto:", err.message);
    throw new Error("Falla al crear un proyecto.");
  }
};

const addExpenseAmount = async (id, amount, transaction) => {
  try {
    const project = await Project.findByPk(id, { transaction });
    if (!project) {
      throw new Error("Proyecto no existente.");
    }

    await project.update(
      { total_amount: Number(project.total_amount) + Number(amount) },
      { transaction }
    );
  } catch (error) {
    throw new Error("Falla al actualizar monto del proyecto: " + error.message);
  }
};

const deleteExpenseAmount = async (id, amount, transaction) => {
  try {
    const project = await Project.findByPk(id, { transaction });
    if (!project) {
      throw new Error("Proyecto no existente.");
    }

    await project.update(
      { total_amount: Number(project.total_amount) - Number(amount) },
      { transaction }
    );
  } catch (error) {
    throw new Error("Falla al actualizar monto del proyecto: " + error.message);
  }
};

const addParticipant = async (id, req) => {
  const existingProject = await Project.findOne({
    where: { project_id: id },
  });

  if (!existingProject) {
    throw new Error("Error: Proyecto inexistente.");
  }

  const existingParticipant = await getUserByEmail(req.email);

  const userFromNotification = await getUserById(req.user_from_id);

  const notificationMessage = `${userFromNotification.name} ${userFromNotification.lastname} te ha agregado al proyecto ${existingProject.title}`;

  if (!existingParticipant) {
    try {
      const pendingUser = await registerPendingUser(req.email);

      await ProjectUser.create({
        user_id: pendingUser.user_id,
        project_id: id,
      });

      await addNotification({
        user_from_id: userFromNotification.user_id,
        user_to_id: pendingUser.user_id,
        project_id: id,
        message: notificationMessage,
        type: "Success",
      });

      return ADDED_PARTICIPANT_SUCCESFULLY;
    } catch (err) {
      throw new Error("Error registrando un usuario pendiente: ", err.message);
    }
  }

  await ProjectUser.create({
    user_id: existingParticipant.user_id,
    project_id: id,
  });

  await addNotification({
    user_from_id: req.user_from_id,
    user_to_id: existingParticipant.user_id,
    project_id: id,
    message: notificationMessage,
    type: "Success",
  });

  return ADDED_PARTICIPANT_SUCCESFULLY;
};

const deleteProject = async (id) => {
  try {
    const project = await Project.findByPk(id);

    if (project) {

      await ProjectUser.destroy({
        where: {
          project_id: id,
        },
      });

      await Project.destroy({
        where: {
          project_id: id,
        },
      });

      return "Proyecto borrado con exito.";
    }
  } catch (error) {
    throw new Error(
      "Ocurrio un error al intentar borrar el proyecto: " + error.message
    );
  }
};
const getProjectsByUserId = async (userId) => {
  try {
    const projectsFromUser = await ProjectUser.findAll({
      where: {
        user_id: userId,
      },
    });

    const projectIds = projectsFromUser.map((project) => project.project_id);

    if (projectIds.length === 0) {
      return [];
    }

    const projects = await Project.findAll({
      where: {
        project_id: {
          [Op.in]: projectIds,
        },
      },
    });

    return projects;
  } catch (err) {
    console.error("Error al obtener proyectos:", err.message);
    throw new Error("No se pudieron obtener los proyectos.");
  }
};

const getUsersByProjectId = async (projectId) => {
  try {
    const usersFromProject = await ProjectUser.findAll({
      where: {
        project_id: projectId,
      },
    });

    const usersIds = usersFromProject.map((project) => project.user_id);

    const users = await getUsersByIdList(usersIds);

    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", err.message);
    throw new Error("No se pudieron obtener los usuarios del proyecto.");
  }
};

const getProjectById = async (projectId) => {
  try {
    const project = await Project.findByPk(projectId);

    return project;
  } catch (error) {
    console.error("Error al obtener proyecto:", err.message);
    throw new Error("No se pudo obtener el proyecto.");
  }
};

const updateProject = async (id, req) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error("Proyecto no existente.");
    }

    await project.update({
      title: req.title || project.title,
      description: req.description || project.description,
      state: req.state || project.state,
    });

    return "Proyecto actualizado con exito.";
  } catch (error) {
    throw new Error(
      "Ocurrio un error al intentar actualizar el proyecto: " + error.message
    );
  }
};

const deleteParticipantFromProject = async (id, req) => {
  try {
    const projectUser = await ProjectUser.findOne({
      where: {
        project_id: id,
        user_id: req.userId,
      },
    });

    if (!projectUser) {
      throw new Error("El participante no pertenece al proyecto.");
    }

    await removeSplitFromUserByProjectId(req.userId, id);

    await ProjectUser.destroy({
      where: {
        project_id: id,
        user_id: req.userId,
      },
    });

    const userFromNotification = await getUserById(req.user_from_id);
    const project = await getProjectById(id);

    const notificationMessage = `${userFromNotification.name} ${userFromNotification.lastname} te ha borrado del proyecto ${project.title}`;

    await addNotification({
      user_from_id: userFromNotification.user_id,
      user_to_id: req.userId,
      project_id: id,
      message: notificationMessage,
      type: "Warning",
    });

    return "Participante borrado con éxito del proyecto.";
  } catch (err) {
    throw new Error(
      "Ocurrió un error al intentar eliminar al participante del proyecto: " +
        err.message
    );
  }
};

module.exports = {
  addProject,
  deleteProject,
  addParticipant,
  getProjectsByUserId,
  getUsersByProjectId,
  getProjectById,
  updateProject,
  deleteParticipantFromProject,
  addExpenseAmount,
  deleteExpenseAmount,
};
