const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema ({
    username: {type: String},
    title: { type: String, unique: true, required: true },
    imgsrc: { type: String, required: true},
    tags: [String]
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image