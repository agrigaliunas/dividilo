const { Project } = require("../db/config");
const { ProjectUser } = require("../db/config");
const User = require("../db/models/User");
const { use } = require("../routes/project");
const { registerPendingUser } = require('../services/AuthService');
const { getUserByEmail } = require('../services/UserService');
const { Op } = require('sequelize');

const ADDED_PARTICIPANT_SUCCESFULLY = "Participante agregado correctamente."

const addProject = async (projectData) => {
    try {
        const newProject = await Project.create(projectData);
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

const getProjectsByUserId = async (userId) => {

    try {
        const projectsFromUser = await ProjectUser.findAll({
            where: {
                user_id: userId,
            }
        });

        console.log(projectsFromUser)

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
        console.error('Error obteniendo proyectos:', err.message);
        throw new Error('No se pudieron obtener los proyectos.');
    }
};

module.exports = {
    addProject,
    addParticipant,
    getProjectsByUserId
};