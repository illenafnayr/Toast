const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    address: {type: String}
})

const Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination