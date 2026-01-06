import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import connectDB from './config/db.config.js'
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import initializeSocket from './socket/socket.js';

dotenv.config({})


const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}

app.use(cors(corsOptions))
app.use((req, res, next) => {
    req.io = io
    req.userSocketMap = io.userSocketMap
    next()
})

const server = http.createServer(app)
const io = initializeSocket(server)

// apis
app.use('/api/v1/user', userRouter)
app.use('/api/v1/message', messageRouter)

const PORT = process.env.PORT || 3000

server.listen(PORT, '0.0.0.0',  () => {
    connectDB()
    console.log(`server is running at PORT : ${PORT}`)
})