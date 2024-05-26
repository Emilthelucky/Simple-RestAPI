import winston from 'winston'
import path from 'path'
import { __dirname, __filename } from '../configurations/file_dir_name.js'

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'grey',
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const logDirectory = path.join(__dirname, '../log')
const logFile = path.join(logDirectory, 'console.log')

const logger = winston.createLogger({
    levels,
    format,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: logFile }),
    ],
})

export { logger }
