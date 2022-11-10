import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    lesson: String,
    questions: [
      {
        title: String,
        variants: [String],
        correct: [Number],
      },
    ],
    completedTests: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

export default mongoose.model('Test', TestSchema);
