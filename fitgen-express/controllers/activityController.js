const Activity = require('../models/activity')
const { PORT } = process.env


const activitiesList = (req, res, next) => {
    Activity
    .find()
    .select('_id userId activityType activityName duration startDate description')
    .exec()
    .then(docs => {
        // console.log(docs)
        const response = {
            count: docs.length,
            activities: docs.map(doc => {
                return {
                    _id: doc._id,
                    id: doc.id,
                    // userId: doc.userId,
                    // activityType: doc.activityType,
                    activityName: doc.activityName,
                    startDate: doc.startDate,
                    // endDate: doc.endDate,
                    // durationHour: doc.durationHour,
                    // durationMin: doc.durationMin,
                    description: doc.description,
                    isSuccess: doc.isSuccess,
                    request: {
                        type: "GET",
                        url: `https://fitgen-backend-fsxwpyquj-krit357.vercel.app/activities/${doc._id}`
                    }
                }
            })
        }
        return res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    })
}


const addActivity = async (req, res, next) => {
    const activity = await new Activity({
        // userId: req.params.userId,
        // activityType: req.body.activityType,
        activityName: req.body.activityName,
        // durationHour: req.body.durationHour,
        // durationMin: req.body.durationMin,
        startDate: req.body.startDate,
        // endDate: req.body.endDate,
        description: req.body.description,
        isSuccess: req.body.isSuccess,
    })
    activity
    .save()
    .then(result => {
        // console.log(result)
       return res.status(201).json({
            message: "Added activity successfully",
            addedActivity: {
                _id: result._id,
                userId: result.userId,
                activityType: result.activityType,
                activityName: result.activityName,
                startDate: result.startDate,
                endDate: result.endDate,
                duration: result.duration,
                description: result.description,
                isSuccess: result.isSuccess,
                request: {
                    type: 'GET',
                    url: `https://fitgen-backend-fsxwpyquj-krit357.vercel.app/activities/${result._id}`
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    })
}


const oneActivity = (req, res, next) => {
    const id = req.params.activityId
    Activity
    .findById(id)
    .select('_id userId activityType activityName duration startDate description')
    .exec()
    .then(doc => {
        console.log("Find by id from database", doc)
        if (doc) {
          return res.status(200).json({
              activity: doc,
              request: {
                  type: 'GET',
                  url: `https://fitgen-backend-fsxwpyquj-krit357.vercel.app/activities`
              }
          })
        } else {
          return res
            .status(404)
            .json({ message: "Invalid ID" })
        }
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({ error: err })
      })
}


const updateActivity = (req, res, next) => {
    const id = req.params.activityId;
    Activity
    .findById(id)
    if (!id) {
        return res.json({
            message: "User doesn't exist"
        });
    } else {
        Activity
        .findByIdAndUpdate({ _id: id }, { 
            $set: {
                // activityType: req.body.activityType,
                activityName: req.body.activityName,
                // durationHour: req.body.durationHour,
                // durationMin: req.body.durationMin,
                startDate: req.body.startDate,
                // endDate: req.body.endDate,
                description: req.body.description,
                isSuccess: req.body.isSuccess,
            }
        })
        .exec()
        .then(result => {
            console.log(result)
            return res.status(200).json({
                message: 'Activity updated',
                request: {
                    type: 'GET',
                    url: `https://fitgen-backend-fsxwpyquj-krit357.vercel.app/activities/${id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
              error: err
            })
        })
    }
}


const deleteActivity = (req, res, next) => {
    const id = req.params.activityId;
    Activity.remove({ _id: id })
      .exec()
      .then(result => {
        console.log(result)
        return res.status(200).json({
            message: 'Activity deleted',
            request: {
                type: 'POST',
                url: `https://fitgen-backend-fsxwpyquj-krit357.vercel.app/activities`,
            }
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          error: err
        });
    });
}


module.exports = { activitiesList, addActivity, oneActivity, updateActivity, deleteActivity }
