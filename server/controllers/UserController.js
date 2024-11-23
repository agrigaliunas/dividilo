const UserService = require('../services/UserService');

const getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.userId);
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    getUserById,
};