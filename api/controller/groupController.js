import Group from '../models/Group.js';

export const create = async (req, res, next) => {
  try {
    const newGroup = new Group(req.body);
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updateGroup = await Group.findByIdAndUpdate(
      req.params.groupId,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updateGroup);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (_, res, next) => {
  try {
    const groups = await Group.find({}).populate('lessonIds');
    res.send(groups);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const groups = await Group.findById(req.params.id).populate('lessonIds');
    res.send(groups);
  } catch (err) {
    next(err);
  }
};

export const removeCollection = async (_, res) => {
  res.json('не сегодня');
  // try {
  //   await Group.deleteMany();
  //   res.json('COLLECTION HAS BEEN DESTROYED');
  // } catch (err) {
  //   console.log('ERR: ', err);
  // }
};

export const addLesson = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.groupId,
      { $addToSet: { lessonIds: req.body.id } },
      { new: true }
    );
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
};