import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    lessonIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Lesson',
    },
    schedules: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: false }
)

export default mongoose.model('Class', GroupSchema)
