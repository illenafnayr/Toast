//Imports
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const session = require('express-session')
require('dotenv').config()

//Config
const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//Connection error/success
db.on('error', (err)=> console.log(err.message + ' is Mongod not running?'))
db.on('connected', ()=> console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', ()=> console.log('mongo disconnected'))

//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}))

//Controllers
const seedController = require('./controllers/seed_controller.js')
app.use('/seed', seedController)

const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

const indexController = require('./controllers/index_controller.js')
app.use('/index', indexController)

const publicController = require('./controllers/public_controller.js')
app.use('/', publicController)


// Listening
app.listen(PORT, ()=>{
    console.log('listening on port: ', PORT)
});