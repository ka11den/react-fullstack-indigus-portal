import mongoose from 'mongoose'

const ScheduleSchema = new mongoose.Schema(
  {
    title: String,
    validUntil: String,
    group: {
      type: String,
      ref: 'Class',
    },
    lessons: [
      {
        type: String,
        ref: 'Lesson',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Schedule', ScheduleSchema)
