const bcrypt = require('bcrypt')
const express = require('express')
const public = express.Router()
const Image = require('../models/image.js')


public.get('/', (req, res)=>{
    Image.find({}, (err, data)=>{
        res.render('home.ejs', {
            images: data,
            currentUser: req.session.currentUser
        });
    })
});


public.put('/:id', (req, res)=>{
    Image.findByIdAndUpdate( req.params.id, req.body, {new: true}, (err, data)=>{
        if (err) {
            res.send(err + '<a href="/">Back to Home</a>')
            console.log(err);
        } else {
            res.redirect('/index')
        }
    })
})

public.get('/:id', (req, res)=>{
    Image.findById(req.params.id, (err, data)=>{
        Image.find({}, (err, allImages)=>{
            res.render('show.ejs', {
                currentUser: req.session.currentUser,
                image: data,
                allImages: allImages
            })
        })
    })
})

module.exports = public