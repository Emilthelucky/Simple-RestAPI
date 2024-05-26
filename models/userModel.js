import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            default: 'guest_user',
        },
        email: {
            type: String,
            required: true,
            default: 'guest@gmail.com',
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const userModel = mongoose.model('users', userSchema)
