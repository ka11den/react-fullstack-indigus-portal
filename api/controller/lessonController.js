import Lesson from '../models/Lesson.js'

export const createLesson = async (req, res, next) => {
  const newLesson = new Lesson(req.body)
  try {
    const savedLesson = await newLesson.save()
    res.status(200).json(savedLesson)
  } catch (err) {
    next(err)
  }
}

export const updateLesson = async (req, res, next) => {
  try {
    const updateLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateLesson)
  } catch (err) {
    next(err)
  }
}

export const getLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    res.status(200).json(lesson)
  } catch (err) {
    next(err)
  }
}

export const getLessons = async (req, res, next) => {
  try {
    const filter = req.query.ids
      ? { _id: { $in: req.query.ids.split(';') } }
      : {}
    const lessons = await Lesson.find(filter).populate('works')
    res.status(200).json(lessons)
  } catch (err) {
    next(err)
  }
}

export const deleteLesson = async (req, res, next) => {
  try {
    const deleteLesson = await Lesson.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteLesson)
  } catch (err) {
    next(err)
  }
}
