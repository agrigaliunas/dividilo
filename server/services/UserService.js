const { User } = require("../db/db");

const createUser = async (user) => await User.create(user);

module.exports = {
    createUser,
};