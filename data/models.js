let { DataTypes } = require('sequelize')
let db = require('./database')

// GOALS DB MODULE
const Goal = db.define('Goal', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'Goals'
})

// MODULE EXPORTING AS "Goal"
module.exports = Goal