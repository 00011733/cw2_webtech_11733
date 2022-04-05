// THIRD-PART APIs
const express = require('express')
const app = express()

// PORT
const PORT = process.env.PORT || 5050

// DB
const db = require('./data/database')
const Goal = require('./data/models')

db.sync({ force: false }).then(() => 'Db is successfully connected...')

// Setting Up
app.set('view engine','pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }))

// ROOT URL
app.get('/', function(req,res) {
    res.render('index')
})

app.listen(PORT, function() {
    console.log(`Server is running on port ${ PORT }`);
})
