const asyncHandler = require('express-async-handler')
const joiValidation = require('../middlewares/joiValidation')
const pool = require('../config/db')

const fetchNote = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const value = await joiValidation.idSchema.validateAsync(req.params)
    const {id} = value

    const [rows] = await pool.query(`
        SELECT * FROM notes
        WHERE folder_id=? AND id=?
        `, [userId, id])

    res.json({
        message: 'Fetch note',
        success: true,
        data: rows
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

module.exports = {
    fetchNote,
    createNotes
}