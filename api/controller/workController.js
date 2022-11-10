import Lesson from '../models/Lesson.js'
import Work from '../models/Work.js'

export const createWork = async (req, res, next) => {
  try {
    const lessonId = req.params.lessonid
    const newWork = new Work({ ...req.body, lessonId })

    const savedWork = await newWork.save()

    await Lesson.findByIdAndUpdate(lessonId, {
      $push: { works: savedWork._id },
    })
    res.send(savedWork)
  } catch (err) {
    console.log('create Work: ', err)
    next(err)
  }
}

export const getWorksByLessonId = async (req, res, next) => {
  try {
    const list = await Work.find({ lessonId: req.params.id })
    res.json(list)
  } catch (err) {
    next(err)
  }
}

export const updateWork = async (req, res, next) => {
  try {
    const userId = req.body.userId
    const options = {
      $set: { progress: req.body.progress },
    }

    if (!req.body.progress) {
      options['$pull'] = { completedWorkers: { $in: userId } }
    } else {
      options['$push'] = { completedWorkers: userId }
    }
    const updateWork = await Work.findByIdAndUpdate(req.params.id, options, {
      new: true,
    })
    res.status(200).json(updateWork)
  } catch (err) {
    next(err)
  }
}

export const getWork = async (req, res, next) => {
  try {
    const work = await Work.findById(req.params.id)
    res.status(200).json(work)
  } catch (err) {
    next(err)
  }
}

export const deleteWork = async (req, res, next) => {
  const lessonId = req.params.lessonid
  try {
    const deletedWork = await Work.findByIdAndDelete(req.params.id)
    try {
      await Lesson.findByIdAndUpdate(lessonId, {
        $pull: { works: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.status(200).json(deletedWork)
  } catch (err) {
    next(err)
  }
}

export const getWorks = async (req, res, next) => {
  try {
    const works = await Work.find()
    res.status(200).json(works)
  } catch (err) {
    next(err)
  }
}
