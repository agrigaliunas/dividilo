const SplitService = require("../services/SplitService");

const addSplit = async (req, res) => {
  try {
    const split = await SplitService.addSplit(req.body);
    res.status(201).json(split);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateSplit = async (req, res) => {
  try {
    const response = await SplitService.updateSplit(
      req.params.splitId,
      req.body
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteSplit = async (req, res) => {
  try {
    const response = await SplitService.removeSplit(
      req.params.splitId,
      req.body.ticketId
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getSplitById = async (req, res) => {
  try {
    const split = await SplitService.getSplitById(req.params.splitId);
    res.status(200).json(split);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getSplitsByTicketId = async (req, res) => {
  try {
    const splits = await SplitService.getSplitsByTicketId(req.params.ticketId);
    res.status(200).json(splits);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};


const removeSplitFromUserByProjectId = async (req, res) => {
  const { userId, projectId } = req.params;

  try {
    const response = await SplitService.removeSplitFromUserByProjectId(userId, projectId);
    res.status(200).json(response);
  } catch (err) {
    console.error('Error en removeSplitFromUserByProjectId:', err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addSplit,
  updateSplit,
  deleteSplit,
  getSplitById,
  getSplitsByTicketId,
  removeSplitFromUserByProjectId
};
