const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('User', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    firstname: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    lastname: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

})

//User.sync({ force: true })

module.exports = User