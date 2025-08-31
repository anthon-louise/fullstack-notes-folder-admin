module.exports = async (next, req, res, err) => {
    const status = err.statusCode || err.status || 500
    res.status(status).json({
        status,
        message: err.message || 'Internal Server Error',
        success: false
    })
}