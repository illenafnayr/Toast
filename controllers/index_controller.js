const bcrypt = require('bcrypt')
const express = require('express')
const index = express.Router()
const Image = require('../models/image.js')


const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
  }

index.get('/:id/edit', isAuthenticated, (req, res)=>{
    Image.findById(req.params.id, (err, data)=>{
        res.render('edit.ejs', {
            currentUser: req.session.currentUser,
            image: data
        })
    })
})

index.get('/', isAuthenticated, (req, res)=>{
    Image.find({username: req.session.currentUser.username}, (err, data)=>{
        res.render('index.ejs', {
            currentUser: req.session.currentUser,
            images: data
        })
    })
});

index.post('/', isAuthenticated, (req, res)=>{
    username = req.body.username
    title = req.body.title
    imgsrc = req.body.imgsrc
    tags = req.body.tags.toString().replace(/\s/g, '').split(",")
    Image.create({
        username: username,
        title: title,
        imgsrc: imgsrc,
        tags: tags
    }, (err, data)=>{
        if (err) {
            res.send(err + '<a href="/">Back to Home</a>')
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
})

index.put('/:id', (req, res)=>{
    id = req.params.id
    Image.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data)=>{
        res.redirect('/' + id)
    })
})

index.delete('/:id', isAuthenticated, (req, res) => {
    Image.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/index')
    })
})

module.exports = index