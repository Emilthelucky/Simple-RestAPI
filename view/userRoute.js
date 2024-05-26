import express from 'express'
import {
    getAllUsers,
    getUserByUserId,
    registerUser,
    loginUser,
} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUserByUserId)
userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)

export { userRouter }
