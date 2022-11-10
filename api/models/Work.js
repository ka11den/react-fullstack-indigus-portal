import mongoose from 'mongoose'

const WorkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    questions: {
      type: [String],
    },
    progress: {
      type: Number,
      default: 0,
    },
    completedWorkers: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: String,
      required: false,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Work', WorkSchema)
