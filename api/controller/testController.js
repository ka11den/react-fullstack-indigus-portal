import Lesson from '../models/Lesson.js';
import Test from '../models/Test.js';

export const createTest = async (req, res, next) => {
  try {
    const lessonId = req.params.lessonid;
    const newTest = new Test({ ...req.body, lesson: req.params.lessonid });
    const savedTest = await newTest.save();

    await Lesson.findByIdAndUpdate(lessonId, {
      $push: { tests: savedTest._id },
    });
    res.status(200).json(savedTest);
  } catch (err) {
    next(err);
  }
};

export const updateTest = async (req, res, next) => {
  try {
    const userId = req.body.userId

    await Test.findByIdAndUpdate(req.params.id, {
      $push: {completedTests: userId },
    })

    await Test.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedTest);
  } catch (err) {
    next(err);
  }
};

export const getTests = async (req, res, next) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    next(err);
  }
};

export const getTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json(test);
  } catch (err) {
    next(err);
  }
};

export const getTestsById = async (req, res, next) => {
  try {
    const test = await Test.find({
      lesson: req.params.id,
      tests: { $in: req.query.ids.split(';') },
    });
    res.status(200).json(test);
  } catch (err) {
    next(err);
  }
};

export const deleteTest = async (req, res, next) => {
  const lessonId = req.params.lessonid;
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    try {
      await Lesson.findByIdAndUpdate(lessonId, {
        $pull: { tests: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(deletedTest);
  } catch (err) {
    next(err);
  }
};
