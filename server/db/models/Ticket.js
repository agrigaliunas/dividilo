const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ticket = sequelize.define('Ticket', {
        ticket_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(13, 2),
            allowNull: false,
            defaultValue: 0
        },
        ticket_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        expense_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'expenses',
                key: 'expense_id'
            }
        }
    }, {
        tableName: 'tickets',
        timestamps: false
    });

    return Ticket;
};