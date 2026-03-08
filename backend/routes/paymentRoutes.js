const express = require('express')
const paymentController = require('../controllers/paymentController')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.post('/', auth, isAdmin, paymentController.create)
router.get('/member/:memberId', auth, paymentController.getByMember)
router.get('/monthly-revenue', auth, paymentController.getMonthlyRevenue)

module.exports = router
