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
    description: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.INTEGER
    },
    isLongTerm: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'Goals'
})

// MODULE EXPORTING AS "Goal"
module.exports = Goal