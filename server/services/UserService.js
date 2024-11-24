const { User } = require("../db/config");
const { sendEmail } = require("../services/EmailService");
const { accountDeletedTemplate } = require("../utils/EmailTemplates");

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  return user;
};

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({
    where: { email: userEmail }
  });
  return user;
};

const deleteAccount = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (user) {
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

    throw new Error("Usuario no existente.");
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
};
