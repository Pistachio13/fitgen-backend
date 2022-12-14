const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Activity = require('../models/activity')


router.get('/', (req, res, next) => {
    Activity
    .find()
    .exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.post('/add', (req, res, next) => {
    const activity = new Activity({
        userId: req.body.userId,
        activityName: req.body.activityName,
        duration: req.body.duration,
        date: req.body.date,
        description: req.body.description,
    })
    activity
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router