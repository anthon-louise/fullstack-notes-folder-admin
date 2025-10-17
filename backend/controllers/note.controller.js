const asyncHandler = require('express-async-handler')
const joiValidation = require('../middlewares/joiValidation')
const pool = require('../config/db')

const fetchNotes = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const value = await joiValidation.idSchema.validateAsync(req.params)
    const {id} = value

    const [rows] = await pool.query(`
        SELECT * FROM notes
        WHERE user_id=? AND folder_id=?
        `, [userId, id])

    res.json({
        message: 'Fetch notes',
        success: true,
        data: rows
    })
})

module.exports = {
    fetchNotes
}