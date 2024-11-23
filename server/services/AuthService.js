const { User } = require("../db/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


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
            password: hashedPassword,
            initials,
        });

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
        throw new Error("Credenciales inválidas");
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


const getInitials = (user) => {
    return (user.name.charAt(0) + user.lastname.charAt(0)).toUpperCase()
}

module.exports = {
    register,
    getInitials,
    login
};