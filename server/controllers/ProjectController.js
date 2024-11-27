const ProjectService = require("../services/ProjectService");

const addProject = async (req, res) => {
  try {
    const project = await ProjectService.addProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const user = await ProjectService.deleteProject(req.params.projectId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const addParticipant = async (req, res) => {
  try {
    const response = await ProjectService.addParticipant(
      req.params.id,
      req.body
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getProjectsByUserId = async (req, res) => {
  try {
    const response = await ProjectService.getProjectsByUserId(
      req.params.userId
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getUsersByProjectId = async (req, res) => {
  try {
    const response = await ProjectService.getUsersByProjectId(
      req.params.projectId
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteParticipantFromProject = async (req, res) => {
  try {
    const response = await ProjectService.deleteParticipantFromProject(
      req.params.projectId,
      req.body
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const response = await ProjectService.getProjectById(req.params.projectId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const response = await ProjectService.updateProject(
      req.params.projectId,
      req.body
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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
};
