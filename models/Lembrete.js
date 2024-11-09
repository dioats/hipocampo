const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Lembrete = sequelize.define('Lembrete', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email_usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  notificado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  data_notificacao: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  data_evento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'lembrete',
  timestamps: false
});

Lembrete.sync();

module.exports = Lembrete;
