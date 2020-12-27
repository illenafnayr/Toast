const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res)=>{
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

sessions.post('/', (req, res)=>{
    User.findOne({username: req.body.username}, (err, foundUser)=>{
        if(err){
            console.log(err)
            res.send('<a href="/">OOPS, Database Error</a>')
        } else if (!foundUser) {
            res.send('<a href="/">User Not Found</a>')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.redirect('/index')
            } else {
                res.send('<a href="/"> Passwords Do Not Match</a>')
            }
        }
    })
})

sessions.delete('/', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})


module.exports = sessions