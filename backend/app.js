const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const userRouter = require('./routes/user.route')
const folderRouter = require('./routes/folder.route')
const noteRouter = require('./routes/note.route')
const cookieParser = require('cookie-parser')

const app = express()

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/users', userRouter)
app.use('/folders', folderRouter)
app.use('/notes', noteRouter)



app.use(errorHandler)

module.exports = app