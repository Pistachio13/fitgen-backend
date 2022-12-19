const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const checkAuth = require('../middleware/check-auth')

const { signup, login, logout, deleteUser, readUserInfo } = userController

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', checkAuth, logout)

router.delete('/:userId', checkAuth, deleteUser)

router.get('/userInfo/:userInfoId', checkAuth, readUserInfo)



module.exports = router