const User = require('../models/user')
const UserInfo = require('../models/userInfo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PORT } = process.env


const signup = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email already exist"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    }) 
                } else {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    })
        
                    user
                    .save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: 'User created'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        }) 
                    })
                }
            })
        }
    })
}


const login = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1) {
            res.status(404).json({
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(404).json({
                    message: 'Auth failed'
                })
            } 
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.JWT_KEY, { expiresIn: '1d' })
                return res.cookie('access_token', token, {
                    httpOnly: true
                })
                .status(200).json({
                    message: 'Auth successful',
                    token: token
                })
            } 
            res.status(401).json({
                message: 'Auth failed'
                })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}


const logout = (req, res, next) => {
    res.clearCookie('access_token').status(200).json('Logout success')
}


const deleteUser = (req, res, next) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'User deleted'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
} 


const readUserInfo = (req, res, next) => {
    const id = req.params.userInfoId
    UserInfo
    .findById(id)
    .select('_id userId name surName age gender weight height')
    .exec()
    .then(doc => {
        console.log("Find by id from database", doc)
        if (doc) {
          res.status(200).json({
              userInfo: doc,
              request: {
                  type: 'GET',
                  url: `http://localhost:${PORT}/userInfo`
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


const addUserInfo = (req, res, next) => {
    const userInfo = new UserInfo({
        userId: req.params.userId,
        name: req.body.name,
        surName: req.body.surName,
        age: req.body.age,
        gender: req.body.gender, 
        weight: req.body.weight,
        height:req.body.height,
    })
    userInfo
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: "Added information successfully",
            addedUserInfo: {
                _id: result._id,
                userId: result.userId,
                name: result.name,
                surName: result.surName,
                age: result.age,
                gender: result.gender, 
                weight: result.weight,
                height:result.height,
                request: {
                    type: 'GET',
                    url: `http://localhost:${PORT}/userInfo/${result._id}/added`
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


const updateUserInfo = (req, res, next) => {
    const id = req.params.userInfoId
    UserInfo
    .findById(id)
    if (!id) {
        return res.json({
            message: "User doesn't exist"
        });
    } else {
        UserInfo
        .findByIdAndUpdate({ _id: id }, { 
            $set: {
                name: req.body.name,
                surName: req.body.surName,
                age: req.body.age,
                gender: req.body.gender, 
                weight: req.body.weight,
                height:req.body.height,
            }
        })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Information updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:${PORT}/userInfo/${id}/update`
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



module.exports = { signup, login, logout, deleteUser, readUserInfo, addUserInfo, updateUserInfo}