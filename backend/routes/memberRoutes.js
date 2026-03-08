const express = require('express')
const memberController = require('../controllers/memberController')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

// Coach: lecture seule
router.get('/', auth, memberController.getAll)
router.get('/:id', auth, memberController.getById)

// Admin: CRUD complet
router.post('/', auth, isAdmin, memberController.create)
router.put('/:id', auth, isAdmin, memberController.update)
router.delete('/:id', auth, isAdmin, memberController.remove)

module.exports = router
