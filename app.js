// THIRD-PART APIs
const express = require('express')
const app = express()
const { body, validationResult } = require('express-validator')

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
app.get('/', async function(req,res) {
    let goals = null
    let cats = {
        0: "Business",
        1: "Sports",
        2: "Self-Development",
        3: "Family"
    }
    // ERROR HANDLING
    try {
        goals = await Goal.findAll()

        let id = req.query.id != undefined ? req.query.id : undefined
        let updated = req.query.updated == "true" ? true : false
        let deleted = req.query.deleted == "true" ? true : false
        let done = req.query.done == "true" ? true : false

        res.render('index', {
            goals: goals,
            id: id,
            updated: updated,
            deleted: deleted,
            done: done,
            cats: cats
        })

    } catch {
        goals = [],
        res.render('index', { goals: goals })
    }
})

// CREATE GET REQUEST
app.get('/createNew', function(req,res){
    res.render('add-update')
})


// CREATE POST REQ
app.post('/createGoal',
    body("title").isLength({ min: 1 }).withMessage("Title must not be empty"),
    body("category").isLength({ min: 1 }).withMessage("Please choose category"),
    body("description").isLength({ min: 10 }).withMessage("Description must contain at least 10 characters"),
    async function(req,res){
        let id = req.params.id
        let goal = await Goal.findByPk(id)
        // VALIDATION
        const err = validationResult(req)
        let titleError = null
        let categoryError = null
        let descriptionError = null
        if(!err.isEmpty()) {
            const errors = err.array()
            for (error of errors){
                if (error.param == "title") {
                    titleError = error.msg
                }
                if (error.param == "category") {
                    categoryError = error.msg
                }
                if (error.param == "description") {
                    descriptionError = error.msg
                }
            }
            res.render('add-update', {
                goal: goal,
                titleError: titleError,
                categoryError: categoryError,
                descriptionError: descriptionError
            })
        } else {
            const goal = await Goal.create(req.body)
            res.redirect(`/?id=${ goal.id }`)
        }
        
})

// EDITING
app.get('/update/:id', async (req,res) => {
    let id = req.params.id
    let goal = await Goal.findByPk(id)
    let cats = {
        0: "Business",
        1: "Sports",
        2: "Self-Development",
        3: "Family"
    } 
    res.render('add-update', { 
        goal: goal,
        cats: cats
    })
})

app.post('/updateGoal/:id', async function(req,res) {
    let id = req.params.id

    let updatedGoal = await Goal.update({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description
    }, {
        where: {
            id: id
        }
    })
    res.redirect(`/?updated=true`)
})

// Delete
app.get('/deleteGoal/:id', async (req,res) => {
    let id = req.params.id
    let deletedGoals = await Goal.destroy({
        where: {
            id: id
        }
    })

    res.redirect(`/?deleted=true`)
})




// LISTEN Server
app.listen(PORT, function() {
    console.log(`Server is running on port ${ PORT }`);
})
