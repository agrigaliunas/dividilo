const AuthService = require('../services/AuthService');

const register = async (req, res) => {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}


const login = async (req, res) => {
    try {
        const user = await AuthService.login(req.body);
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const restorePassword = async (req, res) => {
    try {
        const user = await AuthService.restorePassword(req.body);
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    register,
    login,
    restorePassword
};