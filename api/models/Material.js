import mongoose from "mongoose"

const MaterialSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
            unique: true,
        },
        materialFile: {
            type: String,
            required: false,
        },
    },
    {timestamps: true}
)

export default mongoose.model('Material', MaterialSchema)