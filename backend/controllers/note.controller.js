const asyncHandler = require('express-async-handler')
const joiValidation = require('../middlewares/joiValidation')
const pool = require('../config/db')

const fetchNote = asyncHandler(async (req, res) => {
    const noteIdValue = await joiValidation.idSchema.validateAsync(req.params)
    const folderIdValue = await joiValidation.idSchema.validateAsync(req.body)
    const folderId = folderIdValue.id
    const noteId = noteIdValue.id
    const {userId} = req.user

    const [folder] = await pool.query(`
        SELECT *
        FROM folders
        WHERE id=? AND user_id=?
        `, [folderId, userId])
    
    if (folder.length === 0) {
        const err = new Error('Folder not found')
        err.status = 404
        throw err
    }

    const [notes] = await pool.query(`
        SELECT * FROM notes
        WHERE folder_id=? AND id=?
        `, [folderId, noteId])
    
    if (notes.length === 0) {
        const err = new Error('Note not found')
        err.status = 404
        throw err
    }

    res.json({
        message: 'Fetch note',
        success: true,
        data: notes
    })
})

const createNotes = asyncHandler(async (req, res) => {
    const bodyValue = await joiValidation.noteSchema.validateAsync(req.body)
    const idValue = await joiValidation.idSchema.validateAsync(req.params)
    const {title, content} = bodyValue
    const {id} = idValue

    const [result] = await pool.query(`
        INSERT INTO notes (title, content, folder_id)
        VALUES (?, ?, ?)
        `, [title, content, id])

    res.json({
        message: 'Created a note successfully',
        success: true,
        data: result.insertId
    })
})

const deleteNote = asyncHandler(async (req, res) => {
    const value = await joiValidation.idSchema.validateAsync(req.params)
    const {id} = value
    const {userId} = req.user

    const [rows] = await pool.query(`
        SELECT *
        FROM notes
        JOIN folders ON notes.folder_id = folders.id
        WHERE notes.id=? and folders.user_id=?
        `, [id, userId])

    if (rows.length === 0) {
        const err = new Error('Note not found')
        err.status = 404
        throw err
    }

    await pool.query(`
        DELETE FROM notes
        WHERE id=?
        `, [id])

    res.json({
        message: 'Note deleted successfully',
        success: true
    })
})

const updateNote = asyncHandler(async (req, res) => {
    const idValue = await joiValidation.idSchema.validateAsync(req.params)
    const bodyValue = await joiValidation.noteSchema.validateAsync(req.body)
    const {id} = idValue
    const {title, content} = bodyValue
    const {userId} = req.user

    const [notes] = await pool.query(`
        SELECT *
        FROM notes
        JOIN folders ON notes.folder_id = folders.id
        WHERE notes.id=? AND folders.user_id=?
        `, [id, userId])

    if (notes.length === 0) {
        const err = new Error('Note not found')
        err.status = 404
        throw err
    }

    await pool.query(`
        UPDATE notes
        SET title=?, content=?
        WHERE id=?
        `, [title, content, id])

    res.json({
        message: 'Updated successfully',
        success: true
    })
})

module.exports = {
    fetchNote,
    createNotes,
    deleteNote,
    updateNote
}