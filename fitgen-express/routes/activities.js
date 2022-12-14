const express = require('express')
const router = express.Router()
const Activity = require('../models/activity')


router.get('/', (req, res, next) => {
    Activity
    .find()
    .exec(result => {
        
    })

})

module.exports = router