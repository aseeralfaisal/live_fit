const { Sequelize } = require('sequelize')

const db = new Sequelize('postgres', 'postgres', '1234', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

module.exports = db
