const express = require('express')
const router = express.Router()
const activityController = require('../controllers/activityController')


const { activitiesList, addActivity, oneActivity, updateActivity, deleteActivity } = activityController

router.get('/', activitiesList)

router.post('/create', addActivity)

router.get("/:activityId", oneActivity)

router.put("/:activityId/update", updateActivity)

router.delete("/:activityId/delete", deleteActivity)




module.exports = router