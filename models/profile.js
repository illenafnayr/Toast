const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    dob: {type: Number, required: true},
    address: {
        addressLine1: {type: String},
        addressLine2: {type: String},
        addressLine3: {type: String},
        city: {type: String},
        region: {type: String},
        postalCode: {type: String},
        country: {type: String, required: true}
    },
    covid19Data: {
        hadTest: {type: Boolean, required: true},
        testInfo: {
            type: {type: String},
            results: {type: Boolean},
            date: {type: Number},
            location: {type: String}
        }
    },
    targetDestinations: [String]
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile