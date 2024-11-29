const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const sequelize = new Sequelize({
    database: 'api-2024',
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    logging: console.log,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = require('./models/User')(sequelize);
const Project = require('./models//Project')(sequelize);
const ProjectUser = require('./models/ProjectUser')(sequelize);
const Ticket = require('./models/Ticket')(sequelize);
const Split = require('./models/Split')(sequelize);
const Expense = require('./models/Expense')(sequelize)
const Notification = require('./models/Notification')(sequelize)

dotenv.config();

User.belongsToMany(Project, { through: ProjectUser, foreignKey: 'user_id' });
Project.belongsToMany(User, { through: ProjectUser, foreignKey: 'project_id' });

Project.hasMany(Expense, { foreignKey: 'project_id' });
Expense.belongsTo(Project, { foreignKey: 'project_id' });

Expense.hasMany(Ticket, { foreignKey: 'expense_id' });
Ticket.belongsTo(Expense, { foreignKey: 'expense_id' });

User.hasMany(Split, { foreignKey: 'user_id' });
Split.belongsTo(User, { foreignKey: 'user_id' });

Ticket.hasMany(Split, { foreignKey: 'ticket_id' });
Split.belongsTo(Ticket, { foreignKey: 'ticket_id' });

Notification.belongsTo(User, { as: 'UserFrom', foreignKey: 'user_from_id' });
Notification.belongsTo(User, { as: 'UserTo', foreignKey: 'user_to_id' });
Notification.belongsTo(Project, { foreignKey: 'project_id' });

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida la base de datos.');
        
        await sequelize.sync({ force: false });
        console.log('Base de datos y tablas sincronizadas exitosamente.');
        
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};


initializeDatabase();

module.exports = {
    sequelize,
    initializeDatabase,
    User,
    Project,
    ProjectUser,
    Expense,
    Ticket,
    Notification,
    Split,
};