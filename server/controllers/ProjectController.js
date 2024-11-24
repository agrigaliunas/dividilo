const ProjectService = require('../services/ProjectService');

const addProject = async (req, res) => {
    try {
        const project = await ProjectService.addProject(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const addParticipant = async (req, res) => {
    try {
        const response = await ProjectService.addParticipant(req.params.id, req.body)
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    addProject,
    addParticipant
};