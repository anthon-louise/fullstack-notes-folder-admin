const asyncHandler = require('express-async-handler')
const joiValidation = require('../middlewares/joiValidation')
const pool = require('../config/db')

const createFolder = asyncHandler(async (req, res) => {
    const value = await joiValidation.folderSchema.validateAsync(req.body)
    const {name} = value
    const {userId} = req.user

    const [result] = await pool.query(`
        INSERT INTO folders (name, user_id)
        VALUES (?, ?)
        `, [name, userId])

    res.json({
        message: 'Created a folder',
        success: true
    })
})

const fetchFolders = asyncHandler(async (req, res) => {
    const {userId} = req.user

    const [rows] = await pool.query(`
        SELECT * FROM folders
        WHERE user_id=?
        `, [userId])
    
    res.json({
        message: 'Folders fetched',
        success: true,
        data: rows
    })
})

const fetchNotes = asyncHandler(async (req, res) => {

    const value = await joiValidation.idSchema.validateAsync(req.params)
    const {id} = value

    const [rows] = await pool.query(`
        SELECT * FROM notes
        WHERE folder_id=?
        `, [id])

    res.json({
        message: 'Notes fetched',
        success: true,
        data: rows
    })
})

const deleteFolder = asyncHandler(async (req, res) => {
    const value = await joiValidation.idSchema.validateAsync(req.params)
    const {id} = value

    await pool.query(`
        DELETE FROM folders
        WHERE id=?
        `, [id])

    res.json({
        message: 'Folder deleted',
        success: true
    })
})

module.exports = {
    createFolder,
    fetchFolders,
    fetchNotes,
    deleteFolder
}