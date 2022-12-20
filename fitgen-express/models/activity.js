const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    id: { type: String }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    activityType: { type: String, required: true },
    activityName: { type: String, required: true },
    durationHour: { type: Number, required: true },
    durationMin: { type: Number, required: true },
    startDate: { type: Date, required: true, default: Date.now() },
    endDate: { type: Date, required: true, default: Date.now() },
    description: { type: String },
    isSuccess: { type: Boolean, default: false },
}) 

module.exports = mongoose.model('Activity', activitySchema)