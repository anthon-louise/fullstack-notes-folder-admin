const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const userRouter = require('./routes/user.route')
const folderRouter = require('./routes/folder.route')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/users', userRouter)
app.use('/folders', folderRouter)



app.use(errorHandler)

module.exports = app