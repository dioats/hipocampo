const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
}, 
{
    freezeTableName: true
});

User.sync();

module.exports = User;