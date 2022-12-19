const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const checkAuth = require('../middleware/check-auth')

const {  addUserInfo, updateUserInfo } = userController

router.post('/:userInfoId/added', checkAuth, addUserInfo)

router.put('/:userInfoId/updated', checkAuth, updateUserInfo)

module.exports = router