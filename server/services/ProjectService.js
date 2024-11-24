const { Project } = require("../db/config");
const { ProjectUser } = require("../db/config");
const User = require("../db/models/User");
const { registerPendingUser } = require('../services/AuthService');
const { getUserByEmail } = require('../services/UserService');


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

        } catch(err) {
            throw new Error('Error registrando un usuario pendiente: ', err.message)
        }
    }

    await ProjectUser.create({
        user_id: existingParticipant.user_id,
        project_id: id
    })

    return ADDED_PARTICIPANT_SUCCESFULLY

}


module.exports = {
    addProject,
    addParticipant
};