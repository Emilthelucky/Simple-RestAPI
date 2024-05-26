import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
    path: './configurations/config.env',
})

const ConnectDB = () => {
    mongoose
        .connect(process.env.DB_URI, {
            dbName: 'advanced_rest_api',
        })
        .then(() => {
            console.log('Connected to DB')
        })
        .catch((err) => {
            console.log('DATABASE ERROR')
        })
}

export { ConnectDB }
