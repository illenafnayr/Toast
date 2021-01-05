const bcrypt = require('bcrypt')
const express = require('express')
const seed = express.Router()
const Image = require('../models/image.js')

let seedData = [
    {
        username: 'ryan',
        title: 'Yosemite',
        imgsrc: 'https://i.imgur.com/4t4WyI1.jpg',
        tags: ['colors','nature','park']
    },
    {
        username: 'ryan',
        title: 'Monarch',
        imgsrc: 'https://i.imgur.com/QN221uN.jpg',
        tags: ['insect','butterfly','nature']
    },
    {
        username: 'ryan',
        title: 'Fungi',
        imgsrc: 'https://i.imgur.com/on5yI8q.jpg',
        tags: ['fungus','colors','nature']
    },
    {
        username: 'bill',
        title: 'Ants',
        imgsrc: 'https://i.imgur.com/fykGkAS.jpg',
        tags: ['insect','colony','purple and green']
    },
    {
        username: 'bill',
        title: 'froggo',
        imgsrc: 'https://i.imgur.com/zAuhjGA.jpg',
        tags: ['amphibian','chytridiomycosis','green']
    },
    {
        username: 'bill',
        title: 'oil spill',
        imgsrc: 'https://i.imgur.com/sNmTLUv.jpg',
        tags: ['cells','hydrophobic','colors']
    },
    {
        username: 'frank',
        title: 'ducks',
        imgsrc: 'https://i.imgur.com/DnUbvtU.jpg',
        tags: ['quack','nature','love']
    },
    {
        username: 'frank',
        title: 'Leopard Froggo',
        imgsrc: 'https://i.imgur.com/G48hSCb.jpg',
        tags: ['amphibian','chytrid','food']
    },
    {
        username: 'frank',
        title: 'Fitzroy',
        imgsrc: 'https://i.imgur.com/BC0k6v6.jpg',
        tags: ['mantis','insect','books']
    },
]

seed.get('/', (req, res)=>{
    Image.create( seedData, (err, data)=>{
        res.send(seedData)
    })
})



module.exports = seed