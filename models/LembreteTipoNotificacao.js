const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Lembrete = require('./Lembrete');
const TipoNotificacao = require("./TipoNotificacao");

const LembreteTipoNotificacao = sequelize.define('LembreteTipoNotificacao', {
  id_lembrete: {
    type: DataTypes.INTEGER,
    references: {
      model: Lembrete,
      key: 'id'
    }
  },
  id_tipo_notificacao: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoNotificacao,
      key: 'id'
    }
  }
}, {
  tableName: 'lembrete_tipo_notificacao',
  timestamps: false
});

Lembrete.belongsToMany(TipoNotificacao, { through: LembreteTipoNotificacao, foreignKey: 'id_lembrete' });
TipoNotificacao.belongsToMany(Lembrete, { through: LembreteTipoNotificacao, foreignKey: 'id_tipo_notificacao' });

LembreteTipoNotificacao.sync();

module.exports = LembreteTipoNotificacao;
