const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const session = require('express-session')
require('dotenv').config()
const Destination = require('./models/destinations.js')
const User = require('./models/users.js')


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
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

//Routes
app.get('/', (req, res)=>{
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    })
})


app.get('/index', (req, res)=>{
    res.render('index.ejs', {
        currentUser: req.session.currentUser,
    })
})


// app.get('/index', (req, res)=>{
//     Destination.find({}, (err, data)=>{
//         res.render('index.ejs', {
//             destinations: data,
//             currentUser: req.session.currentUser
//         }) 
//     })
// })


app.post('/index', (req, res)=>{
    User.findOneAndUpdate({username: req.session.currentUser.username}, { $addToSet: { destinations: req.body.destinations}}, {new: true}, (err, foundUser)=>{
        res.redirect('/index')
    })
})



app.listen(PORT, ()=>{
    console.log('listening on port: ', PORT)
})