const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    activityType: { type: String, required: true },
    activityName: { type: String, required: true },
    durationHour: { type: Number, required: true },
    durationMin: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now() },
    description: { type: String },
    isSuccess: { type: Boolean, default: false },
}) 

module.exports = mongoose.model('Activity', activitySchema)