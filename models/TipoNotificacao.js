const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const TipoNotificacao = sequelize.define('TipoNotificacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tipo_notificacao',
  timestamps: false
});

TipoNotificacao.sync();

module.exports = TipoNotificacao;
