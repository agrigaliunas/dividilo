const { User } = require("../db/config");
const { sendEmail } = require("../services/EmailService");
const { accountDeletedTemplate } = require("../utils/EmailTemplates");
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  return user;
};

const getUserByIdWithPassword = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const getUsersByIdList = async (usersIds) => {
  const users = await User.findAll({
    where: {
      user_id: {
        [Op.in]: usersIds,
      },
    },
    attributes: { exclude: ["password"] },
  });

  return users;
};

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({
    where: { email: userEmail },
    attributes: { exclude: ["password"] },
  });
  return user;
};

const deleteAccount = async (id, req) => {

  try {
    const user = await getUserByIdWithPassword(id);

    if (!user) {
      throw new Error("Usuario no existente.");
    }

    if (user) {
      const validPassword = await bcrypt.compare(req.password, user.password);
      if (!validPassword) {
          throw new Error("Credenciales inválidas");
      }

      await User.destroy({
        where: {
          user_id: id,
        },
      });

      try {
        await sendEmail(
          user.email,
          accountDeletedTemplate.subject,
          accountDeletedTemplate.html
        );
      } catch (emailError) {
        console.error("Error enviando email:", emailError);
      }

      return "Usuario borrado con exito.";
    }

  } catch (error) {
    throw new Error(
      "Ocurrio un error al intentar borrar el usuario: " + error.message
    );
  }
};

const completeOnboarding = async (id, req) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error("Usuario no existente.");
    }

    if (user.finished_onboarding === 1) {
      throw new Error("Usuario ya completo el onboarding anteriormente.");
    }

    const newInitials = getInitialsFromNameAndLastname(
      req.name, 
      req.lastname
    );
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.password, salt);

    await user.update({
        name: req.name,
        lastname: req.lastname,
        initials: newInitials,
        password: hashedPassword,
        finished_onboarding: 1
    });
    
    return "Onboarding finalizado. Usuario actualizado con exito.";
} catch (error) {
    throw new Error("Ocurrio un error al intentar actualizar el onboarding del usuario: " + error.message);
}
}


const updateUser = async (id, req) => {
  try {
      const user = await User.findByPk(id);
      if (!user) {
          throw new Error("Usuario no existente.");
      }

      let newInitials;
      if (req.name || req.lastname) {
        newInitials = getInitialsFromNameAndLastname(
          req.name || user.name, 
          req.lastname || user.lastname
        );
      }

      await user.update({
          name: req.name || user.name,
          lastname: req.lastname || user.lastname,
          email: req.email || user.email,
          initials: newInitials || user.initials
      });
      
      return "Usuario actualizado con exito.";
  } catch (error) {
      throw new Error("Ocurrio un error al intentar actualizar el usuario: " + error.message);
  }
};

const getInitials = (user) => {
  return (user.name.charAt(0) + user.lastname.charAt(0)).toUpperCase();
};

const getInitialsFromNameAndLastname = (name, lastname) => {
  return (name.charAt(0) + lastname.charAt(0)).toUpperCase();
};

module.exports = {
  getUserById,
  getUserByEmail,
  deleteAccount,
  getInitials,
  getUsersByIdList,
  updateUser,
  completeOnboarding
};
