import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Route
import authRoute from './routes/authRoute.js'
import usersRoute from './routes/usersRoute.js'
import lessonRoute from './routes/lessonRoute.js'
import workRoute from './routes/workRoute.js'
import testRoute from './routes/testRoute.js'
import messageRoute from './routes/messageRoute.js'
import newRoute from './routes/newRoute.js'
import groupRoute from './routes/groupRoute.js'
import materialRoute from './routes/materialRoute.js'
import scheduleRoute from './routes/schedulesRoute.js'

const app = express()
dotenv.config()

// middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/lesson', lessonRoute)
app.use('/api/work', workRoute)
app.use('/api/test', testRoute)
app.use('/api/message', messageRoute)
app.use('/api/news', newRoute)
app.use('/api/group', groupRoute)
app.use('/api/material', materialRoute)
app.use('/api/schedule', scheduleRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Не ожиданая ошибка!'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


const start = async () => {
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log('mongodb connection!')
    } catch (error) {
        throw error
    }
    
    app.listen(process.env.port, () => {
        console.log(`Backend to started! ${process.env.port}`)
    })
}

start()