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

// cambiar datos (email, nombre, apellido)
// si cambia nombre y apellido cambiar iniciales

// updateOnboarding

const getInitials = (user) => {
  return (user.name.charAt(0) + user.lastname.charAt(0)).toUpperCase();
};

module.exports = {
  getUserById,
  getUserByEmail,
  deleteAccount,
  getInitials,
  getUsersByIdList,
};
