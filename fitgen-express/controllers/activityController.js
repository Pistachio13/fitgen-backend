const Activity = require('../models/activity')
const { PORT } = process.env


const activitiesList = (req, res, next) => {
    Activity
    .find()
    .select('_id activityType activityName duration date description')
    .exec()
    .then(docs => {
        console.log(docs)
        const response = {
            count: docs.length,
            activities: docs.map(doc => {
                return {
                    _id: doc._id,
                    activityType: doc.activityType,
                    activityName: doc.activityName,
                    date: doc.date,
                    durationHour: doc.durationHour,
                    durationMin: doc.durationMin,
                    description: doc.description,
                    isSuccess: doc.isSuccess,
                    request: {
                        type: "GET",
                        url: `http://localhost:${PORT}/activities/${doc._id}`
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}


const addActivity = (req, res, next) => {
    const activity = new Activity({
        activityType: req.body.activityType,
        activityName: req.body.activityName,
        durationHour: req.body.durationHour,
        durationMin: req.body.durationMin,
        date: req.body.date,
        description: req.body.description,
        isSuccess: req.body.isSuccess,
    })
    activity
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: "Added activity successfully",
            addedActivity: {
                _id: result._id,
                activityType: result.activityType,
                activityName: result.activityName,
                date: result.date,
                duration: result.duration,
                description: result.description,
                isSuccess: result.isSuccess,
                request: {
                    type: 'GET',
                    url: `http://localhost:${PORT}/activities/${result._id}`
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}


const oneActivity = (req, res, next) => {
    const id = req.params.activityId
    Activity
    .findById(id)
    .select('_id activityType activityName duration date description')
    .exec()
    .then(doc => {
        console.log("Find by id from database", doc)
        if (doc) {
          res.status(200).json({
              activity: doc,
              request: {
                  type: 'GET',
                  url: `http://localhost:${PORT}/activities`
              }
          })
        } else {
          res
            .status(404)
            .json({ message: "Invalid ID" })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
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
                activityType: req.body.activityType,
                activityName: req.body.activityName,
                durationHour: req.body.durationHour,
                durationMin: req.body.durationMin,
                date: req.body.date,
                description: req.body.description,
                isSuccess: req.body.isSuccess,
            }
        })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Activity updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:${PORT}/activities/${id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
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
        res.status(200).json({
            message: 'Activity deleted',
            request: {
                type: 'POST',
                url: `http://localhost:${PORT}/activities`,
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
}


module.exports = { activitiesList, addActivity, oneActivity, updateActivity, deleteActivity }