const { User } = require("../db/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { sendEmail } = require('../services/EmailService');
const { welcomeTemplate, inviteToProjectTemplate, passwordUpdatedTemplate } = require("../utils/EmailTemplates");

const register = async (user) => {
    const existingUser = await User.findOne({
        where: { email: user.email }
    });

    if (existingUser) {
        throw new Error("Ocurrio un error. Usuario ya existente.");
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const initials = getInitials(user);

        const newUser = await User.create({
            ...user,
            finished_onboarding: 1,
            password: hashedPassword,
            initials,
        });

        try {
            await sendEmail(
                user.email,
                welcomeTemplate.subject,
                welcomeTemplate.html
            );
        } catch (emailError) {
            console.error('Error enviando email:', emailError);
        }


        const { password, ...userWithoutPassword } = newUser.toJSON();
        return userWithoutPassword;

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error("El email ya está registrado");
        }
        throw new Error("Error al crear el usuario: " + error.message);
    }
};

const registerPendingUser = async (email) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedEmail = await bcrypt.hash(email, salt);
        const hashedPassword = await bcrypt.hash(hashedEmail, salt);

        const initials = getInitialsByEmail(email)

        const newUser = await User.create({
            name: "Usuario",
            lastname: "Pendiente",
            email: email,
            finished_onboarding: 0,
            password: hashedPassword,
            initials,
        });

        try {
            const template = inviteToProjectTemplate(hashedEmail);
            await sendEmail(
                email,
                template.subject,
                template.html
            );
        } catch (emailError) {
            console.error('Error enviando email:', emailError);
        }

        const { password, ...userWithoutPassword } = newUser.toJSON();
        return userWithoutPassword;

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error("El email ya está registrado");
        }
        throw new Error("Error al crear el usuario: " + error.message);
    }
};

const login = async (loginData) => {
    const user = await User.findOne({
        where: { email: loginData.email }
    });

    if (!user) {
        throw new Error("Ocurrio un error al intentar iniciar sesion. Intente nuevamente.");
    }

    const validPassword = await bcrypt.compare(loginData.password, user.password);
    if (!validPassword) {
        throw new Error("Credenciales inválidas");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
        user: userWithoutPassword,
        token: token
    };
};

const restorePassword = async (data) => {
    const user = await User.findOne({
        where: { email: data.email }
    });

    if (!user) {
        throw new Error("Usuario no existe.");
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
        throw new Error("Credenciales inválidas");
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.newPassword, salt);

        await User.update(
            { password: hashedPassword },
            {
                where: {
                    email: data.email
                }
            }
        );

        try {
            await sendEmail(
                data.email,
                passwordUpdatedTemplate.subject,
                passwordUpdatedTemplate.html
            );
        } catch (emailError) {
            console.error('Error enviando email:', emailError);
        }
    } catch (error) {
        throw new Error("Error al actualizar contraseña: " + error.message);
    }

    return "Contraseña actualizada con éxito.";
}


const getInitials = (user) => {
    return (user.name.charAt(0) + user.lastname.charAt(0)).toUpperCase()
}

const getInitialsByEmail = (email) => {
    return (email.substring(0, 2)).toUpperCase()
}

module.exports = {
    register,
    registerPendingUser,
    login,
    restorePassword,
    getInitials,
    getInitialsByEmail
};