const { Sequelize } = require('sequelize')

const db = new Sequelize('Goals', 'admin', 'admin', {
    host: 'db.sqlite3',
    dialect: 'sqlite'
})

module.exports = db