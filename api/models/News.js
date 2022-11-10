import mongoose from "mongoose"

const NewsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: [String],
            required: false,
        },
    },
    {timestamps: true}
)

export default mongoose.model('News', NewsSchema)