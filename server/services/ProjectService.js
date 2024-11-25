const { Project } = require("../db/config");
const { ProjectUser } = require("../db/config");
const { registerPendingUser } = require('../services/AuthService');
const { getUserByEmail, getUsersByIdList } = require('../services/UserService');
const { Op } = require('sequelize');

const ADDED_PARTICIPANT_SUCCESFULLY = "Participante agregado correctamente."

const addProject = async (projectData) => {
    try {
        const newProject = await Project.create(projectData);

        await ProjectUser.create({
            user_id: projectData.user_id,
            project_id: newProject.project_id
        })

        return newProject;
    } catch (err) {
        console.error('Error creando proyecto:', err.message);
        throw new Error('Falla al crear un proyecto.');
    }
};

const addParticipant = async (id, req) => {


    const existingProject = await Project.findOne({
        where: { project_id: id }
    });

    if (!existingProject) {
        throw new Error('Error: Proyecto inexistente.')
    }

    const existingParticipant = await getUserByEmail(req.email);

    if (!existingParticipant) {
        try {
            const pendingUser = await registerPendingUser(req.email)

            await ProjectUser.create({
                user_id: pendingUser.user_id,
                project_id: id
            })

            return ADDED_PARTICIPANT_SUCCESFULLY

        } catch (err) {
            throw new Error('Error registrando un usuario pendiente: ', err.message)
        }
    }

    await ProjectUser.create({
        user_id: existingParticipant.user_id,
        project_id: id
    })

    return ADDED_PARTICIPANT_SUCCESFULLY

}

const deleteProject = async (id) => {

    try {
        const project = await Project.findByPk(id);

        if (project) {

            await ProjectUser.destroy({
                where: {
                    project_id: id
                }
            })

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
}
const getProjectsByUserId = async (userId) => {

    try {
        const projectsFromUser = await ProjectUser.findAll({
            where: {
                user_id: userId,
            }
        });

        const projectIds = projectsFromUser.map(project => project.project_id);

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
        console.error('Error al obtener proyectos:', err.message);
        throw new Error('No se pudieron obtener los proyectos.');
    }
};

const getUsersByProjectId = async (projectId) => {
    try {
        const usersFromProject = await ProjectUser.findAll({
            where: {
                project_id: projectId,
            }
        });

        const usersIds = usersFromProject.map(project => project.user_id);

        const users = await getUsersByIdList(usersIds)

        return users;

    } catch (error) {
        console.error('Error al obtener usuarios:', err.message);
        throw new Error('No se pudieron obtener los usuarios del proyecto.');
    }
}


const getProjectById = async (projectId) => {
    try {
        const project = await Project.findByPk(projectId)

        return project;

    } catch (error) {
        console.error('Error al obtener proyecto:', err.message);
        throw new Error('No se pudo obtener el proyecto.');
    }
}

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
        throw new Error("Ocurrio un error al intentar actualizar el proyecto: " + error.message);
    }
}

module.exports = {
    addProject,
    deleteProject,
    addParticipant,
    getProjectsByUserId,
    getUsersByProjectId,
    getProjectById,
    updateProject
};