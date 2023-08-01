const express = require('express')
const userController = require('../controllers/userController')
const getUser = require('../middleware/getUser')
const router = express.Router()

router.post('/add', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/get', getUser, userController.getUser)

module.exports = router
