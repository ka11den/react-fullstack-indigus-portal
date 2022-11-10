import mongoose from 'mongoose'

const LessonSchema = new mongoose.Schema(
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
    works: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Work',
    },
    tests: {
      type: [String],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Lesson', LessonSchema)
