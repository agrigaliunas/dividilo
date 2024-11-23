const { User } = require("../db/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUserById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    
    return user;
}

// eliminar cuenta

// reestablecer contraseña

// cambiar datos (email, nombre, apellido)
    // si cambia nombre y apellido cambiar iniciales

// updateOnboarding

const getInitials = (user) => {
    return (user.name.charAt(0) + user.lastname.charAt(0)).toUpperCase()
}

module.exports = {
    getUserById,
    getInitials,
};