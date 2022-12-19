const mongoose = require('mongoose')

const userInfoSchema = mongoose.Schema({
    name: { type: String, required: true },
    surName: { type: String, required: true },
    age: { type: Number, required: true},
    gender: { type: String, required: true }, 
    weight: { type: Number, required: true},
    height: { type: Number, required: true},
}) 

module.exports = mongoose.model('UserInfo', userInfoSchema)