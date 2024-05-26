import { userModel } from '../models/userModel.js'
import { responseError } from '../utilities/responseError.js'
import { responseSuccess } from '../utilities/responseSuccess.js'
import { Hash } from '../security/passwordHash.js'
import { Compare } from '../security/passwordCompare.js'
import { logger } from '../utilities/logger.js'

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        if (users.length === 0) {
            logger.warn('No active registered users found')
            return responseError(res, 'There are no active registered users')
        }
        logger.info('All users retrieved successfully')
        return responseSuccess(res, users)
    } catch (error) {
        logger.error(`Error retrieving users: ${error.message}`)
        return responseError(res, 'Error retrieving users')
    }
}

const getUserByUserId = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        if (!user) {
            logger.warn(`User not found: ${userId}`)
            return responseError(res, 'No user found')
        }
        logger.info(`User retrieved successfully: ${userId}`)
        return responseSuccess(res, user)
    } catch (error) {
        logger.error(`Error retrieving user: ${error.message}`)
        return responseError(res, 'Error retrieving user')
    }
}

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existedUser = await userModel.findOne({ username })
        if (existedUser) {
            logger.warn(`User already exists: ${username}`)
            return responseError(res, 'User exists')
        } else {
            const hashedPassword = await Hash(password)
            const newUser = await userModel.create({
                username: username,
                email: email,
                password: hashedPassword,
            })
            logger.info(`User registered successfully: ${username}`)
            return responseSuccess(res, newUser)
        }
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`)
        return responseError(res, 'Error registering user')
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ username })
        if (!user) {
            logger.warn(`User not found: ${username}`)
            return responseError(res, 'User not found')
        }
        const checkPassword = await Compare(password, user.password)
        if (!checkPassword) {
            logger.warn(`Password incorrect for user: ${username}`)
            return responseError(res, 'Password is incorrect')
        }
        logger.info(`User logged in successfully: ${username}`)
        return responseSuccess(res, user)
    } catch (error) {
        logger.error(`Error logging in user: ${error.message}`)
        return responseError(res, 'Error logging in user')
    }
}

export { getAllUsers, getUserByUserId, registerUser, loginUser }
