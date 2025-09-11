const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        const err = new Error('Unauthorized')
        err.status = 401
        throw err
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}