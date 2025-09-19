const joiValidation = require('../middlewares/joiValidation')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const pool = require('../config/db')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = asyncHandler(async (req, res) => {
    const value = await joiValidation.userSchema.validateAsync(req.body)
    const {username, password} = value
    
    const [rows] = await pool.query(`
        SELECT * FROM users
        WHERE username=?
        `, [username])
    if (rows.length > 0) {
        const err = new Error('User already exist')
        err.status = 409
        throw err
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(`
        INSERT INTO users (username, password)
        VALUES (?, ?)
        `, [username, hashedPassword])

    res.json({
        message: 'User registered',
        success: true
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const value = await joiValidation.userSchema.validateAsync(req.body)
    const {username, password} = value

    const [rows] = await pool.query(`
        SELECT * FROM users
        WHERE username=?
        `, [username])
    if (rows.length === 0) {
        const err = new Error('User does not exists')
        err.status = 404
        throw err
    }

    const isValid = await bcrypt.compare(password, rows[0].password)
    if (!isValid) {
        const err = new Error('Invalid password')
        err.status = 400
        throw err
    }

    const token = jwt.sign(
        {userId: rows[0].id},
        process.env.SECRET,
        {expiresIn: '1h'}
    )

    res.cookie('token', token, {
        security: false,
        httpOnly: true,
        maxAge: 3600000,
        sameSite: "lax"
    })

    res.json({
        message: 'User loginned',
        success: true
    })
})

module.exports = {
    registerUser,
    loginUser
}