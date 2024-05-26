import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { userRouter } from './view/userRoute.js'
import { ConnectDB } from './configurations/dbConnection.js'
import { __filename, __dirname } from './configurations/file_dir_name.js'

ConnectDB()

const app = express()

dotenv.config({
    path: './configurations/config.env',
})

const port = process.env.PORT
const env = process.env.NODE_ENV

const logDirectory = path.join(__dirname, '../log')
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory)
}
const accessLogStream = fs.createWriteStream(
    path.join(logDirectory, 'request.log'),
    { flags: 'a' }
)

app.use(
    morgan(env === 'production' ? 'combined' : 'dev', {
        stream: accessLogStream,
    })
)

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`App is running on ${port}`)
})
