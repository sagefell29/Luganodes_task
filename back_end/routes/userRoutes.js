const express = require('express')
const userController = require('../controllers/userController')
const MetaMaskController = require('../controllers/metaMask')
const getUser = require('../middleware/getUser')
const router = express.Router()

router.post('/add', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/get', getUser, userController.getUser)
router.post('/alter', getUser, userController.changeDetails)
router.post('/addMM', MetaMaskController.createMetaMask)
router.post('/loginMM', MetaMaskController.loginMetaMask)
router.get('/getMM', getUser, MetaMaskController.getMetaMask)
router.post('/alterMM', getUser, MetaMaskController.changeMetaMask)

module.exports = router
