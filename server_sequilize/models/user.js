const db = require('../config/db.config')
const { DataTypes } = require('sequelize')

const User = db.define(
  'users',
  {
    user: { type: DataTypes.STRING, allowNull: false },
    pass: { type: DataTypes.STRING, allowNull: false },
  },
  { freezeTableName: true, tableName: 'users' }
)

module.exports = User
