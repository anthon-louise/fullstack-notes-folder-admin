const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const noteController = require('../controllers/note.controller')

router.get('/:id', auth, noteController.fetchNote)
router.post('/:id', auth, noteController.createNotes)

module.exports = router