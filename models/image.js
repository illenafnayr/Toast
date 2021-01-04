const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema ({
    username: {type: String},
    title: { type: String, unique: true, required: true },
    imgsrc: { type: String, required: true},
    tags: [{type: String}]
})

//validate: {
    // validator: (str) =>{
    //     let tags = str.split(",")
    //     for (let i = 0; i < tags.length; i++) {
    //         { $addToSet: { tags: tags[i]}}
    //     }
    // }}

const Image = mongoose.model('Image', imageSchema)

module.exports = Image