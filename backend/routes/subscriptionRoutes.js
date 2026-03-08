const express = require('express')
const subscriptionController = require('../controllers/subscriptionController')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.get('/types', auth, subscriptionController.getAllTypes)
router.post('/types', auth, isAdmin, subscriptionController.createType)
router.put('/types/:id', auth, isAdmin, subscriptionController.updateType)
router.delete('/types/:id', auth, isAdmin, subscriptionController.deleteType)
router.post('/assign', auth, isAdmin, subscriptionController.assignToMember)

module.exports = router
