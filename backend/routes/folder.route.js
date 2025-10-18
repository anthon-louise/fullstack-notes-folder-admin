const express = require('express')
const router = express.Router()
const folderController = require('../controllers/folder.controller')
const auth = require('../middlewares/auth')

router.post('/', auth, folderController.createFolder)
router.get('/', auth, folderController.fetchFolders)
router.get('/:id', auth, folderController.fetchNotes)

module.exports = router