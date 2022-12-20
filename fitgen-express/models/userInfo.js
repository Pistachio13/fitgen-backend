const mongoose = require('mongoose')

const userInfoSchema = mongoose.Schema({
    id: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: { type: String, required: true },
    surName: { type: String, required: true },
    age: { type: Number, required: true},
    gender: { type: String, default: 'N/A' }, 
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
}) 

module.exports = mongoose.model('UserInfo', userInfoSchema)