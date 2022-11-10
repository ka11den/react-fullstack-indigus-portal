import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fio: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        groups: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Class'
        }
    },
    {timestamps: true}
)

export default mongoose.model('User', UserSchema)