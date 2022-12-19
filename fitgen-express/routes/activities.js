const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')


const { activitiesList, addActivity, oneActivity, updateActivity, deleteActivity } = activityController

router.get('/views', activitiesList)

router.post('/create', addActivity)

router.get("/:activityId/view", oneActivity)

router.put("/:activityId/update", updateActivity)

router.delete("/:activityId/delete", deleteActivity)




module.exports = router