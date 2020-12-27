const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    DOB: {type: Number, required: true},
    Address: {type: String, required: true},
    contact: {type: String, required: true},
    covid19Data: {
        hadTest: {type: Boolean, required: true},
        testInfo: {
            type: {type: String},
            results: {type: Boolean},
            date: {type: Number},
            location: {type: String}
        }
    },
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile