const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const GameController = require('../controllers/game')

// authMiddleware
// get all histories
router.get('/histories/:page/:perPage',authMiddleware, GameController.get_histories)

// save our game history
router.post('/createhistory', authMiddleware, GameController.save_history)

module.exports = router