const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    activityName: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now() },
    description: { type: String },
}) 

module.exports = mongoose.model('Activity', activitySchema)